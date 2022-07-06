import { Item } from "./types/item";

export const isAlphanumeric = (str: string) => {
    return /[a-zа-яё]/i.test(str);
}

export const filterByFieldAndValues = (items: Item[], field: string, from: string, to: string): Item[] => {
    if (!field) return items;

    if (from && to) return items.filter(item => (
        Number(Object(item)[field]) <= Number(to) && Number(Object(item)[field]) >= Number(from)
    ));
    if (!from && to) return items.filter(item => (
        Number(Object(item)[field]) <= Number(to)
    ));
    if (!to && from) return items.filter(item => (
        Number(Object(item)[field]) >= Number(from)
    ));

    return items;
}

export const filterByDates = (items: Item[], startDate: Date, endDate: Date): Item[] => {
    return items.filter(
        item => {
            const [day, month, year] = item.dateRep.split('/');
            const currentDate = new Date([year, month, day].join("-"));

            if (currentDate >= startDate && currentDate <= endDate) return item;
        }
    );
}

export const filterByCountry = (items: Item[], country: string): Item[] => {

    if (!country) return items;

    return items.filter(
        item => (
            item.countriesAndTerritories.toLowerCase().includes(country.toLowerCase())
        ));
}

export const getCalculatedItems = (items: Item[]): Item[] => {

    let currentCountry = items[0].countriesAndTerritories;

    let totalCases = 0,
        totalDeaths = 0;

    let prevStep = 0;

    for (let i = 0; i < items.length; i++) {

        if (currentCountry !== items[i].countriesAndTerritories || i >= items.length - 1) {

            for (let j = prevStep; j < i + 1; j++) {
                items[j].totalCases = totalCases;
                items[j].totalDeaths = totalDeaths;
                items[j].casesPer1000People = Math.floor(totalCases / 1000);
                items[j].deathsPer1000People = Math.floor(totalDeaths / 1000);
            }

            currentCountry = items[i].countriesAndTerritories;
            totalCases = 0; totalDeaths = 0;
            prevStep = i;
        }

        totalCases += items[i].cases;
        totalDeaths += items[i].deaths;

    }

    return items;
}

export const getCountries = (items: Item[]) => {
    return Array.from(new Set(items.map(item => item.countriesAndTerritories)));
}

export const getDataByContry = (items: Item[], country: string) => {

    const data: any = {cases: [], deaths: [], dateRep: []};
    
    if (country === "all") {
        Array.from(new Set(items.map(item => item.dateRep)))
            .forEach(dateRep => {
                const countries = items.filter(item => item.dateRep === dateRep);

                data.dateRep.push(dateRep);
                data.cases.push(countries.reduce((acc, cur) => acc + cur.cases, 0));
                data.deaths.push(countries.reduce((acc, cur) => acc + cur.deaths, 0));

            });

        return data;
    }

    items.filter(item => item.countriesAndTerritories === country)
        .forEach(item => {
            data.cases.push(item.cases)
            data.deaths.push(item.deaths)
            data.dateRep.push(item.dateRep)
        })

    return data;
}
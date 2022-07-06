import { useEffect, useMemo, useState } from "react"
import { Line } from "react-chartjs-2"
import { Item } from "../types/item"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import _ from "lodash"
import { Form } from "react-bootstrap"
import { getCountries, getDataByContry } from "../utilities"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface ChartPageProps {
    items: Item[]
}

export const ChartPage: React.FC<ChartPageProps> = ({ items }) => {

    const [fields, setFields] = useState([
        { value: "all", label: "Все страны" },
    ]);

    const [currentField, setCurrentField] = useState<string>("all");

    const filteredByDate = useMemo(() => {
        return getDataByContry(_.orderBy(items, item => {

            const [day, month, year] = item.dateRep.split('/');
            return new Date([year, month, day].join("-"));

        }, "asc"), currentField);
    }, [items, currentField]);

    useEffect(() => {
        const countries = getCountries(items).map(country => ({ value: country, label: country }));
        setFields(prev => [...prev, ...countries]);
    }, []);

    const data = useMemo(() =>
    ({
        labels: filteredByDate.dateRep,
        datasets: [
            {
                label: "Заболевания",
                data: filteredByDate.cases,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: "Смерти",
                data: filteredByDate.deaths,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }), [filteredByDate]);

    return (
        <>
            <Form.Select aria-label="Default select example" className="mb-3" value={currentField} onChange={(e) => setCurrentField(e.target.value)} style={{ width: "150px" }}>
                {
                    fields.map((field, idx) => (
                        <option key={field.value + idx} value={field.value}>{field.label}</option>
                    ))
                }
            </Form.Select>
            <Line data={data} />
        </>
    )
}
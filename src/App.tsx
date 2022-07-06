import { filterByDates, getCalculatedItems } from "./utilities";
import { Route, Routes } from "react-router-dom";
import { TablePage } from "./pages/TablePage";
import { ChartPage } from "./pages/ChartPage";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Nav } from "react-bootstrap";
import { Item } from "./types/item";
import axios from "axios";
import _ from "lodash";

const dateDefault = {
    startDate: new Date("2019-12-01"),
    endDate: new Date("2020-08-28"),
}

export const App: React.FC = () => {

    const [items, setItems] = useState<Item[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    // Dates
    const [startDate, setStartDate] = useState<Date>(dateDefault.startDate);
    const [endDate, setEndDate] = useState<Date>(dateDefault.endDate);

    useEffect(() => {
        axios
            .get("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/")
            .then(
                response => {
                    setItems(getCalculatedItems(response.data.records));
                    setIsLoading(false)
                }
            );
    }, []);

    const filteredItems = useMemo(() => {
        return filterByDates(items, startDate, endDate)
    }, [items, startDate, endDate]);

    if (isLoading) return <div>Загрузка...</div>

    return (
        <>
            <Nav className="mb-3">
                <Nav.Link to="/" as={NavLink}>Таблица</Nav.Link>
                <Nav.Link to="/chart" as={NavLink}>График</Nav.Link>
            </Nav>
            <div className="d-flex gap-3 mb-3">
                <span>Период от</span>
                <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                <span>до</span>
                <DatePicker selected={endDate} onChange={(date:Date) => setEndDate(date)} />
            </div>
            <Routes>
                <Route path="/" element={<TablePage items={filteredItems} />} />
                <Route path="/chart" element={<ChartPage items={filteredItems} />} />
            </Routes>
        </>
    )
}
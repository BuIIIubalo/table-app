import { filterByCountry, filterByFieldAndValues } from "../utilities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { pagination_config } from "../configs/pagination-config";
import { TableFilter } from "../components/TableFilter";
import { TableSearch } from "../components/TableSearch";
import { TableLimit } from "../components/TableLimit";
import { Table } from "../components/Table";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import { Item } from "../types/item"
import _ from "lodash";

interface TablePageProps {
    items: Item[]
}

export const TablePage: React.FC<TablePageProps> = ({ items }) => {

    const [seacrher, setSearcher] = useState("");

    const [filter, setFilter] = useState({
        field: "",
        valueFrom: "",
        valueTo: "",
    });

    const [page, setPage] = useState(0);

    const [limit, setLimit] = useState(10);

    const [sorter, setSorter] = useState<{order: any; orderBy: any}>({
        order: "asc",
        orderBy: "countriesAndTerritories",
    });

    useEffect(() => {
        setPage(0);
    }, [limit, seacrher, sorter])

    /*
        Reset: 
            * change page to zero
            * set searcher value to empty
            * set filters property to empty
    */
    const resetHandler = () => {
        setPage(0);
        setSearcher("");
        setFilter({ field: "", valueFrom: "", valueTo: "" });
        setSorter({ order: "asc", orderBy: "countriesAndTerritories" })
    }

    const sortByField = (value: string) => {
        const updatedOred = sorter.order === "asc" ? "desc" : "asc";
        setSorter({ order: updatedOred, orderBy: value })
    }

    const filteredByFieldAndValues = useMemo(() => {
        return filterByFieldAndValues(items, filter.field, filter.valueFrom, filter.valueTo);
    }, [items, filter.field, filter.valueFrom, filter.valueTo]);

    const filteredByCountry = useMemo(() => {
        return filterByCountry(filteredByFieldAndValues, seacrher)
    }, [filteredByFieldAndValues, seacrher]);

    const filteredItems =  useMemo(() => {
        return _.orderBy(filteredByCountry, sorter.orderBy, sorter.order)
    }, [filteredByCountry, sorter.orderBy, sorter.order])

    return (
        <>
            <TableSearch
                seacherChangeHandler={(value) => setSearcher(value.target.value)}
                value={seacrher}
            />

            <TableFilter
                propertyHandler={(property) => setFilter(prev => ({ ...prev, ...property }))}
                filter={filter}
            />

            <Button variant="primary" onClick={resetHandler} className="mb-3">Сбросить фильтры</Button>

            <Table
                items={_.chunk(filteredItems, limit)[page]}
                sorter={sorter}
                onSortByField={sortByField}
            />

            <div className="d-flex justify-content-between">

                <ReactPaginate
                    onPageChange={({ selected }) => setPage(selected)}
                    pageCount={Math.ceil(filteredItems.length / limit)}
                    forcePage={page}
                    {...pagination_config}
                />

                <TableLimit selectChangeHandler={(value) => setLimit(value)} value={limit} />

            </div>
        </>
    )
}
import { Table as TableBS } from "react-bootstrap";
import { Item } from "../types/item";

interface TableProps {
    items: Item[];
    sorter: any;
    onSortByField: (value: string) => void;
}

enum Arrow {
    default = "⇅",
    up = "↑",
    down = "↓",
}

const getArrow = (order: string) => {
    if(order === "asc") return Arrow.up;
    return Arrow.down;
}

const fields = [
    { value: "countriesAndTerritories", label: "Страна" },
    { value: "cases", label: "Кол-во случаев" },
    { value: "deaths", label: "Кол-во смертей" },
    { value: "totalCases", label: "Кол-во случаев (всего)" },
    { value: "totalDeaths", label: "Кол-во смертей (всего)" },
    { value: "casesPer1000People", label: "Кол-во случаев на 1000 жителей" },
    { value: "deathsPer1000People", label: "Кол-во смертей на 1000 жителей" },
]

export const Table: React.FC<TableProps> = ({ items, sorter, onSortByField }) => {

    return (
        <TableBS className="mb-3">
            <thead>
                <tr>
                    {
                        fields.map(field => (
                            <th key={field.label} onClick={() => onSortByField(field.value)}>
                                {field.label}
                                {
                                    (field.value === sorter.orderBy) ?
                                        getArrow(sorter.order) : Arrow.default
                                }
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    items ? 
                    items.map(
                        (item, idx) => (
                            <tr key={"table_" + item.cases + idx }>
                                <td>{ item.countriesAndTerritories }</td>
                                <td>{ item.cases }</td>
                                <td>{ item.deaths }</td>
                                <td>{ item.totalCases }</td>
                                <td>{ item.totalDeaths }</td>
                                <td>{ item.casesPer1000People }</td>
                                <td>{ item.deathsPer1000People }</td>
                            </tr>
                        )
                    ) : <tr><td colSpan={7} className="text-center">Ничего не найдено</td></tr>
                }
            </tbody>
        </TableBS>
    )

}
import { useEffect, useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { isAlphanumeric } from '../utilities';

const fields = [
    { value: "cases", label: "Кол-во случаев" },
    { value: "deaths", label: "Кол-во смертей" },
    { value: "totalCases", label: "Кол-во случаев (всего)" },
    { value: "totalDeaths", label: "Кол-во смертей (всего)" },
    { value: "casesPer1000People", label: "Кол-во случаев на 1000 жителей" },
    { value: "deathsPer1000People", label: "Кол-во смертей на 1000 жителей" },
]

interface TableFilterProps {
    propertyHandler: (value: object) => void
    filter: {
        field: string;
        valueFrom: string;
        valueTo: string;
    }
}

const changeBorderColor = (el: React.MutableRefObject<HTMLInputElement | null>, value: string) => {
    if(isAlphanumeric(value))
        el.current!.style.borderColor = "red";
    else el.current!.style.borderColor = "#ced4da";
}

export const TableFilter: React.FC<TableFilterProps> = ({ propertyHandler, filter }) => {

    const filterPropertyHandler = (e: string, property: string) => {
        switch (property) {
            case "field":
                propertyHandler({ field: e });
                break;
            case "valueFrom":
                propertyHandler({ valueFrom: e});
                break;
            case "valueTo":
                propertyHandler({ valueTo: e });
                break;
            default: return;
        }
    }

    const valueFromRef = useRef(null) as React.MutableRefObject<HTMLInputElement | null>;
    const valueToRef = useRef(null) as React.MutableRefObject<HTMLInputElement | null>;

    useEffect(() => {
        changeBorderColor(valueFromRef, filter.valueFrom);
    }, [filter.valueFrom]);

    useEffect(() => {
        changeBorderColor(valueToRef, filter.valueTo);
    }, [filter.valueTo]);

    return (
        <div className="d-flex gap-3">
            <Form.Select aria-label="Default select example" className="mb-3" onChange={(e) => filterPropertyHandler(e.target.value, "field")} value={filter.field}>
                <option value="" disabled>Фильтровать по полю...</option>
                {
                    fields.map(field => (
                        <option key={"table_filter_" + field.value} value={field.value}>{field.label}</option>
                    ))
                }
            </Form.Select>
            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Text input with checkbox"
                    placeholder="значение от"
                    value={filter.valueFrom}
                    ref={valueFromRef}
                    onChange={(e) => filterPropertyHandler(e.target.value, "valueFrom")}
                />
                <Form.Control
                    aria-label="Text input with checkbox"
                    placeholder="значение до"
                    value={filter.valueTo}
                    ref={valueToRef}
                    onChange={(e) => filterPropertyHandler(e.target.value, "valueTo")}
                />
            </InputGroup>
        </div>
    )
}
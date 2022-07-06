import React from "react"
import { Form } from "react-bootstrap"

const fields = [
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 25, label: "25" },
]

interface TableLimitProps {
    selectChangeHandler: (value: number) => void
    value: number
}

export const TableLimit: React.FC<TableLimitProps> = ({selectChangeHandler, value}) => {

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectChangeHandler(Number(e.target.value));
    }

    return (
        <Form.Select aria-label="Default select example" className="mb-3" onChange={changeHandler} style={{width: "100px"}} value={value}>
            {
                fields.map(field => (
                    <option key={"table_limit_" + field.value} value={field.value}>{field.label}</option>
                ))
            }
        </Form.Select>
    )
}
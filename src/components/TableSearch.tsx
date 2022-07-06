import { InputGroup, Form } from "react-bootstrap";

interface TableSearchProps {
    seacherChangeHandler: (value: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const TableSearch: React.FC<TableSearchProps> = ({seacherChangeHandler, value}) => {
    return (
        <InputGroup className="mb-3">
            <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Поиск страны..."
                onChange={seacherChangeHandler}
                value={value}
            />
        </InputGroup>
    )
}
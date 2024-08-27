import { Button } from "react-bootstrap";

export default function DeleteWorkout({workout, onDelete}) {

    return (
        <Button variant="danger" size="sm" onClick={ (e) => onDelete(e , workout )}>
                            Delete
        </Button>
    )
}
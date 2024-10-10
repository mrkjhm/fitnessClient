import { Button } from "react-bootstrap";

export default function DeleteWorkout({workout, onDelete}) {

    return (
        <Button className="mx-2 my-2" variant="danger" size="sm" onClick={ (e) => onDelete(e , workout )}>
                            Delete
        </Button>
    )
}
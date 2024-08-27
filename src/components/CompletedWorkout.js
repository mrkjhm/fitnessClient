// import { Button } from "react-bootstrap";

// export default function CompletedWorkout({status, workout, onDone}) {

//     return (
//         <Button disabled={status === 'completed'} variant="success" size="sm" onClick={ (e) => onDone(e , workout )}>
//                             Mark as Completed
//         </Button>
//     )
// }


import { Button } from "react-bootstrap";

export default function CompletedWorkout({ status, workout, onDone }) {
    return (
        <Button 
            disabled={status === 'completed'} 
            variant="success" 
            size="sm" 
            onClick={(e) => onDone(e, workout)}
        >
            Mark as Completed
        </Button>
    );
}

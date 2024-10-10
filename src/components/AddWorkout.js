import { useState } from 'react';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';

export default function AddWorkout({show, handleClose, onAdd}) {

    const [ name, setName ] = useState('')
    const [ duration, setDuration ] = useState('15 mins')

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(name, duration);

        setName('')
        setDuration('')
    };

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add Workout</Modal.Title>
                    </Modal.Header>

                    

                    <Modal.Body>

                    <Form.Group controlId="workoutName" className='pb-2'>
                        <FloatingLabel controlId="floatingWorkoutName" label="Workout Name">
                            <Form.Control 
                                type="text"
                                placeholder="Workout Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                    
                                />   
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="duration" className='pb-2'>
                        <FloatingLabel controlId="floatingDuratuion" label="Duration">
                            <Form.Control 
                                type="text"
                                placeholder="Duration:" 
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                    
                                />   
                        </FloatingLabel>
                    </Form.Group>

                
                    


                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}



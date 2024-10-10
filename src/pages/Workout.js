import { useContext, useEffect, useState } from "react"
import { Row, Col, Table, Badge, Button, Modal, Card, ListGroup, Container } from "react-bootstrap"
import Swal from "sweetalert2"

import UserContext from '../UserContext';

import AddWorkout from "../components/AddWorkout"
import UpdateWorkout from "../components/UpdateWorkout"
import DeleteWorkout from "../components/DeleteWorkout"
import CompletedWorkout from "../components/CompletedWorkout"
import { useNavigate } from "react-router-dom";

export default function Workout() {
    

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    

    const [workouts, setWorkouts] = useState([])

    const [addWorkoutModal, setAddWorkoutModal] = useState(false);

    const closeAddWorkoutModal = () => setAddWorkoutModal(false);
    const showAddWorkoutModal = () => setAddWorkoutModal(true);


    const [filter, setFilter] = useState("all"); // 'all', 'completed', 'pending'
    const handleFilterChange = (filterType) => {
        setFilter(filterType);
        fetchWorkout(); // Refetch workouts based on the new filter
    }
    




    // ADD
    const addWorkout = (name, duration) => {

        fetch('https://app-building-api.onrender.com/workouts/addWorkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data.message !== "string") {
                    Swal.fire({
                        title: "Awesome Job!",
                        text: "You're one step closer to your fitness goals. Keep going!",
                        icon: "success",
                        confirmButtonText: "Let's Do More!"
                    });
                    
                    closeAddWorkoutModal();
                } else {
                    Swal.fire({
                        title: "Failed to Add Workout",
                        icon: "error"
                    });
                }
            })

    }


    // UPDATE
    const updateWorkout = (name, duration, id, closeUpdate) => {

        fetch(`https://app-building-api.onrender.com/workouts/updateWorkout/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Workout updated successfully") {
                    Swal.fire({
                        title: "Workout Updated Successfully",
                        icon: "success"
                    });
                    closeUpdate();
                } else {
                    Swal.fire({
                        title: "Failed to Update Workout",
                        icon: "error"
                    });
                }
            })
    }




    // DELETE

    const deleteWorkout = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://app-building-api.onrender.com/workouts/deleteWorkout/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.message === "Workout deleted successfully") {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your workout has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Cannot Delete.",
                                icon: "error"
                            });
                        }

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your workout is safe :)',
                    icon: 'info'
                });
            }
        });

    }










    // Completed

    const completedWorkout = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure you completed the workout?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Yes, I've completed my workout!",
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://app-building-api.onrender.com/workouts/completeWorkoutStatus/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.message === "Workout status updated successfully") {
                            Swal.fire({
                                title: "Great Job!",
                                text: "Your workout has been completed.",
                                icon: "success"
                            });
                            fetchWorkout();
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong.",
                                icon: "error"
                            });
                        }

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Please complete your workout :)',
                    icon: 'info'
                });
            }
        });

    }


    const fetchWorkout = () => {
        fetch("https://app-building-api.onrender.com/workouts/getMyWorkouts", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.message !== "string") {
                // Sort workouts so 'pending' appears first and 'completed' appears last
                const sortedWorkouts = data.workouts.sort((a, b) => {
                    if (a.status === 'pending' && b.status === 'completed') {
                        return -1;
                    } else if (a.status === 'completed' && b.status === 'pending') {
                        return 1;
                    } else {
                        return 0;
                    }
                });
    
                // Map through sorted workouts
                const workoutsArr = sortedWorkouts.map(workout => {
                    const dateAdded = new Date(workout.dateAdded).toLocaleString(); // Format the date added
                    const dateCompleted = workout.dateCompleted ? new Date(workout.dateCompleted).toLocaleString() : null; // Format date completed only once
    
                    return (
                        <div className="col-lg-4 col-md-6 col-12 mb-3" key={workout._id}>
                            <Card>
                                <Card.Header>
                                    <Card.Title>{workout.name}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>Workout Time: {workout.duration}</Card.Text>
                                    <Card.Text>Status: {workout.status === 'completed' ? 'You Did It!' : 'Pending'}</Card.Text>
                                    <Card.Text className="text">Date Added: {dateAdded}</Card.Text> {/* Display the date added */}
                                    
                                    {/* Display the date completed only if the workout is completed */}
                                    {workout.status === 'completed' && dateCompleted && (
                                        <Card.Text className="text">Date Completed: {dateCompleted}</Card.Text>
                                    )}
                                </Card.Body>
                                <Card.Footer>
                                    <UpdateWorkout workoutName={workout.name} workoutDuration={workout.duration} workout={workout._id} onUpdate={updateWorkout} />
                                    <DeleteWorkout workout={workout._id} onDelete={deleteWorkout} />
                                    <CompletedWorkout status={workout.status} workout={workout._id} onDone={completedWorkout} />
                                </Card.Footer>
                            </Card>
                        </div>
                    );
                });
    
                setWorkouts(workoutsArr);
            } else {
                setWorkouts([]);
            }
        });
    };
    
    


    useEffect(() => {
    if (!user.id) {
        navigate('/login');
    }

    fetchWorkout(); 

}, [fetchWorkout, addWorkout, user.id, navigate, filter]) // Add 'filter' to dependencies





return (
    <>
        <div className="container">
            <Row>
                <Col className="p-4 text-center">
                    <h1>Your Personalized Workout Plans</h1>
                </Col>
            </Row>
            <Row className="mb-5 d-flex justify-content-center">
                <Col xs="auto">
                <Button variant="danger" onClick={showAddWorkoutModal}>
                    {workouts.length > 0 ? " Add your next workout!" : "ADD WORKOUT"}
                </Button>
                </Col>
            </Row>
            
           
            <Container className='row' >
            {workouts}
            </Container>
        </div>

        

        {/* AddWorkoutModal Component */}
        <AddWorkout show={addWorkoutModal} handleClose={closeAddWorkoutModal} onAdd={addWorkout} />
    </>
);
}
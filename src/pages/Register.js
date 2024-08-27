import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

	const {user} = useContext(UserContext);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [mobileNo, setMobileNo] = useState("");

    const [isActive, setIsActive] = useState(false);

	function registerUser(e) {

		e.preventDefault();

		fetch('https://app-building-api.onrender.com/users/register',{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			mobileNo: mobileNo

		})
		})
		.then(res => res.json())
		.then(data => {

		//determine the returned data. Especially useful when the given API is online.
		console.log(data);

		//data will only contain an email property if we can properly save our user.
		if(data.message === "Registered Successfully"){

            setFirstName('');
            setLastName('');
			setEmail('');
			setPassword('');
			setMobileNo('');

			Swal.fire({
        	    title: "Registration Successful",
        	    icon: "success",
        	    text: "Thank you for registering!"
        	});

		} 

		})
	}
    
	useEffect(()=>{

		if((email !== "" && password !=="" && mobileNo !=="")){

			setIsActive(true)

		} else {

			setIsActive(false)

		}

	},[firstName, lastName, email, password, mobileNo])

	return (
        
        <div className='d-flex justify-content-center gap-4'>
        <Form onSubmit={(e) => registerUser(e)} className='col-lg-5 col-10'>
        <h1 className="my-5 text-center">Register</h1>

			<Form.Group className='pb-2'>
                {/* <Form.Label>First Name:</Form.Label> */}
                <Form.Control 
                type="text" 
                placeholder="First Name" 
                required 
                value={firstName} 
                onChange={e => {setFirstName(e.target.value)}}/>
            </Form.Group>
			<Form.Group className='pb-2'>
                {/* <Form.Label>Last Name:</Form.Label> */}
                <Form.Control 
                type="text" 
                placeholder="Last Name" 
                required 
                value={lastName} 
                onChange={e => {setLastName(e.target.value)}}/>
            </Form.Group>
            <Form.Group className='pb-2'>
                {/* <Form.Label>Email:</Form.Label> */}
                <Form.Control 
                type="email"
                placeholder="Email address" 
                required 
                value={email} 
                onChange={e => {setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group className='pb-2'>
                {/* <Form.Label>Password:</Form.Label> */}
                <Form.Control 
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={e => {setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group className='pb-2'>
                {/* <Form.Label>Mobile No:</Form.Label> */}
                <Form.Control 
                type="number" 
                placeholder="Mobile No." 
                required 
                value={mobileNo} 
                onChange={e => {setMobileNo(e.target.value)}}/>
            </Form.Group>
			
            {
                isActive

                ? <Button variant="primary" type="submit" className=' col-12'>Register</Button>
                : <Button variant="danger" className=' col-12' disabled>Register</Button>
            }
        </Form>
        </div>
		
		)
}
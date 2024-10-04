import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';
import Banner from '../components/Banner';
import Banner2 from '../components/Banner2';


export default function Home() {

    const { user } = useContext(UserContext);

    return (
        <>
        <div>
   
        <Banner2 />
        

        </div>
      
        {/* <Row>
            <Col className="p-4 text-center">
                <h1>Welcome To Fitnesssssssss</h1>
                <p></p>
                <Link className="btn btn-primary" to={ user.id ? '/workout' : 'login' }>Check Your Workout</Link>
            </Col>
        </Row> */}
        </>
    )
}
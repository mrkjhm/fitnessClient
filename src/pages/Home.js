import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';
import Banner from '../components/Banner';


export default function Home() {

    const { user } = useContext(UserContext);

    return (
        <>
        <Banner />
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
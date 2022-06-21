import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import loginContext from '../components/LoginContext';

const Login = () => {
    const {user, handleSubmit} = useContext(loginContext);
    console.log(user);
    return (
        <div style={{ marginLeft: '25%', marginTop: '2%', width: '50%' }}>
            <img src="" alt="" />
            <Form style={{ margin: '7%' }}>
                <h3>LOG IN</h3>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" placeholder="Enter email or username" required="true"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Password" required="true"/>
                </Form.Group>
                <Link to="/posts"><Button variant="dark" size="lg" type="submit" onSubmit={handleSubmit}>
                    LOGIN
                </Button></Link>
                <p></p>
                <Link to="/pages/register"><Button variant="dark" size="lg" type="submit">
                    CREATE ACCOUNT
                </Button></Link>
            </Form>
        </div>
    );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import config from '../config';
import axios from 'axios';


const LoginForm: React.FC = () => {
    const [cookies, setCookie] = useCookies(['TOKEN']);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect((): any => {
        if (cookies.TOKEN) {
            window.location.href = '/';
        } else {
            setLoading(false);
        }
    }, [cookies.TOKEN]);

    const handleSubmit = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();

        const configuration = {
            method: 'post',
            url: config.endpoints.login,
            data: {
                username,
                password,
            },
        };

        axios(configuration)
            .then((result) => {
                if (result.data.status) {
                    setCookie('TOKEN', result.data.token, {
                        path: '/',
                    });

                    window.location.href = '/';
                } else {
                    alert('Unknown error');
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert('Username and password did not match');
                } else if (error.response.status === 404) {
                    alert('User not found');
                } else {
                    alert('Unknown error');
                }
            });
    };

    if (loading) return <></>;

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId='formBasicusername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='username'
                        name='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                    />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                </Form.Group>

                <Button
                    className='mt-3'
                    variant='primary'
                    type='submit'
                    onClick={(e) => handleSubmit(e)}
                >
                    Login
                </Button>
                <Row className='mt-2'>
                    <Col>
                        <a href={config.appBaseUrl + '/signup'}>
                            Sign Up
                        </a>
                    </Col>
                </Row>

            </Form >
        </>
    );
}

export default LoginForm;
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import config from '../config';
import axios from 'axios';


const RegisterForm: React.FC = () => {
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
            url: config.endpoints.register,
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
                alert('Internal server error');
            });
    };

    if (loading) return <></>;

    return (
        <>
            <h2>Sign Up</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* username */}
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                    />
                </Form.Group>

                {/* password */}
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

                {/* submit button */}
                <Button
                    variant='primary'
                    type='submit'
                    className='mt-3'
                    onClick={(e) => handleSubmit(e)}
                >
                    Sign Up
                </Button>

                <Row className='mt-2'>
                    <Col>
                        <a href={config.appBaseUrl + '/login'}>
                            Already have an account? Login here
                        </a>
                    </Col>
                </Row>
            </Form>
        </>
    );

}

export default RegisterForm;
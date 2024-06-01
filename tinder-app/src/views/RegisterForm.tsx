import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { redirect } from 'react-router-dom';
import config from '../config';
import axios from 'axios';


const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();

        const configuration = {
            method: 'post',
            url: 'https://nodejs-mongodb-auth-app.herokuapp.com/register',
            data: {
                username,
                password,
            },
        };

        axios(configuration)
            .then((result) => {
                setRegister(true);
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <>
            <h2>Register</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* username */}
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter username'
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
                    onClick={(e) => handleSubmit(e)}
                >
                    Register
                </Button>

                {/* display success message */}
                {register ? (
                    <p className='text-success'>You Are Registered Successfully</p>
                ) : (
                    <p className='text-danger'>You Are Not Registered</p>
                )}
            </Form>
        </>
    );

}

export default RegisterForm;
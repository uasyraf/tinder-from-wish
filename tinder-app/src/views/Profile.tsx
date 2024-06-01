import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import config from '../config';
import axios, { AxiosRequestConfig } from 'axios';
import ProfileCard from '../components/ProfileCard';

interface Profile {
    id: number;
    user_id: number;
    name: string;
    gender: string;
    location: string;
    university: string;
    interests: string;
}

const Profile: React.FC = () => {
    const [cookies] = useCookies(['TOKEN']);
    const [profile, setProfile] = useState<Profile>({
        id: 9999999999999,
        user_id: 99999999999999,
        name: 'empty',
        gender: 'empty',
        location: 'empty',
        university: 'empty',
        interests: 'empty',
    });
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [university, setUniversity] = useState('');
    const [interests, setInterests] = useState('');
    const [loading, setLoading] = useState(true);
    const [noProfile, setNoProfile] = useState(true);

    useEffect((): any => {
        if (!cookies.TOKEN) window.location.href = '/';
    }, [cookies.TOKEN]);

    useEffect(() => {
        const configuration: AxiosRequestConfig = {
            method: 'get',
            url: config.endpoints.profile,
            headers: { 'Authorization': cookies.TOKEN }
        };

        axios(configuration)
            .then((result) => {
                if (result.data.status) {
                    setProfile(result.data.profile);
                    setNoProfile(false);
                    setLoading(false);
                } else {
                    alert('Unknown error');
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert('You havent update your profile, please update if you wanna get married');
                    setLoading(false);
                } else {
                    alert('Internal server error');
                }
            });
    }, []);

    const handleSubmit = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();

        const method: string = (noProfile) ? 'post' : 'put';

        const configuration = {
            method: method,
            url: config.endpoints.profile,
            headers: { 'Authorization': cookies.TOKEN },
            data: {
                name,
                gender,
                location,
                university,
                interests,
            },
        };

        axios(configuration)
            .then((result) => {
                if (result.data.status) {
                    alert('Profile updated!');
                    setProfile(result.data.profile);
                } else {
                    alert('Unknown error');
                }
            })
            .catch((error) => {
                alert('Internal server error');
            });
    };

    if (loading) return <>Loading profile...</>;

    return (
        <>
            <Container>
                <Row className='justify-content-center'>
                    <Col className='text-center'>
                        <a className='p-3' href={config.appBaseUrl + '/me'}>My Profile</a>
                        <a className='p-3' href={config.appBaseUrl + '/'}>Recommendations</a>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <ProfileCard profile={profile} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            {/* name */}
                            <Form.Group controlId='formBasicName'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Name'
                                />
                            </Form.Group>

                            {/* gender */}
                            <Form.Group controlId='formBasicGender'>
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='gender'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    placeholder='Gender'
                                />
                            </Form.Group>

                            {/* location */}
                            <Form.Group controlId='formBasicLocation'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder='Location'
                                />
                            </Form.Group>

                            {/* university */}
                            <Form.Group controlId='formBasicUniversity'>
                                <Form.Label>University</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='university'
                                    value={university}
                                    onChange={(e) => setUniversity(e.target.value)}
                                    placeholder='University'
                                />
                            </Form.Group>

                            {/* interests */}
                            <Form.Group controlId='formBasicInterests'>
                                <Form.Label>Interests</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='interests'
                                    value={interests}
                                    onChange={(e) => setInterests(e.target.value)}
                                    placeholder='Interests'
                                />
                            </Form.Group>

                            {/* submit button */}
                            <Button
                                variant='primary'
                                type='submit'
                                className='mt-3'
                                onClick={(e) => handleSubmit(e)}
                            >
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );

}

export default Profile;
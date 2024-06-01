import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProfileCard from '../components/ProfileCard';
import config from '../config';
import axios, { AxiosRequestConfig } from 'axios';

const Recommendation: React.FC = () => {
    const [cookies] = useCookies(['TOKEN']);
    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewCount, setViewCount] = useState(0);

    useEffect((): any => {
        if (!cookies.TOKEN) window.location.href = '/login';
    }, [cookies.TOKEN]);

    useEffect(() => {
        const configuration: AxiosRequestConfig = {
            method: 'get',
            url: config.endpoints.recommendation,
            headers: { 'Authorization': cookies.TOKEN }
        };

        axios(configuration)
            .then((result) => {
                if (result.data.status) {
                    console.log('hello');
                    setProfiles(result.data.profiles);
                    setViewCount(result.data.profiles.length - 1);
                    setLoading(false);
                } else {
                    alert('Unknown error');
                }
            })
            .catch((error) => {
                alert('Internal server error');
            });
    }, []);

    const handleNext = (e: React.SyntheticEvent<any>) => {
        if (!profiles.length) {
            alert('Oops, you have reached your free trial limitations, come back tomorrow :(');
            return;
        }

        if (currentIndex === profiles.length - 1) {
            alert('Oops, you have reached your free trial limitations, come back tomorrow :(');
            return;
        }

        setCurrentIndex(prev => prev + 1);
        setViewCount(prev => prev - 1);
    }

    if (loading) return <>Loading recommendations...</>;

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col className='text-center'>
                    <a className='p-3' href={config.appBaseUrl + '/me'}>My Profile</a>
                    <a className='p-3' href={config.appBaseUrl + '/'}>Recommendations</a>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col className='text-center'>
                    <h5>You have {viewCount} recommendations left!</h5>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col md='8' className='d-flex justify-content-end align-items-center'>
                    <ProfileCard profile={profiles[currentIndex]} />
                </Col>
                <Col md='4' className='d-flex justify-content-start align-items-center'>
                    <Button
                        style={{
                            background: 'url("/next-button.png")',
                            border: '2px solid white',
                            borderRadius: '15px',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '100px',
                            width: '100px',
                        }}
                        type='button'
                        onClick={(e) => handleNext(e)}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Recommendation;

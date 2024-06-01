import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProtectedRoute from './routers/ProtectedRoute';
import LoginForm from './views/LoginForm';
import RegisterForm from './views/RegisterForm';
import Recommendation from './views/Recommendation';
import Profile from './views/Profile';
import config from './config'
import './App.css';


function App() {
  const [currentViewTitle, setcurrentViewTitle] = useState('Recommendation');
  const location = useLocation();

  React.useEffect(() => {
    switch (location.pathname) {
      case '/':
        setcurrentViewTitle('Profile Recommendations');
        break;
      case '/me':
        setcurrentViewTitle('My Profile');
        break;
      case '/signup':
        setcurrentViewTitle('Sign Up');
        break;
      case '/login':
        setcurrentViewTitle('Login');
        break;
      default:
        setcurrentViewTitle('Profile Recommendations');
        break;
    }
  }, [location.pathname]);

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col className='text-center'>
          <h1>Tinder from Wish!</h1>
          <h4>{currentViewTitle}</h4>
        </Col>
      </Row>

      <Routes>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/' element={<Recommendation />} />
        </Route>
        <Route path='/me' element={<ProtectedRoute />}>
          <Route path='/me' element={<Profile />} />
        </Route>
        <Route path='/signup' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </Container>
  );
}

export default App;

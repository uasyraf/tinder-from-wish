import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProtectedRoute from './routers/ProtectedRoute';
import LoginForm from './views/LoginForm';
// import RegisterForm from './views/RegisterForm';
import Recommendation from './views/Recommendation';
// import Profile from './views/Profile';
import './App.css';


function App() {
  const [currentView, setCurrentView] = useState('Recommendation');
  const location = useLocation();

  React.useEffect(() => {
    switch (location.pathname) {
      case '/':
        setCurrentView('Recommendation');
        break;
      case '/profile':
        setCurrentView('Profile');
        break;
      case '/signup':
        setCurrentView('Sign Up');
        break;
      case '/login':
        setCurrentView('Login');
        break;
      default:
        setCurrentView('Recommendation');
        break;
    }
  }, [location.pathname]);

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col className='text-center'>
          <h1>Tinder from Wish!</h1>
        </Col>
      </Row>

      <Routes>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/' element={<Recommendation />} />
        </Route>
        {/* <Route path='/profile' element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile currentView={currentView} />} />
        </Route>
        <Route path='/signup' element={<RegisterForm currentView={currentView} />} /> */}
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </Container>
  );
}

export default App;

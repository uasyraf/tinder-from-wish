import React from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { Route, RouteProps, Navigate, Outlet } from 'react-router-dom';

interface MyJwtPayload extends JwtPayload {
    exp: number;
}

const tokenIsValid = (token: string): boolean => {
    if (!token) return false;

    try {
        const { exp } = jwtDecode<MyJwtPayload>(token);
        return (exp * 1000 < Date.now()) ? false : true;
    } catch (err) {
        return false;
    }
};

const ProtectedRoute: React.FC = () => {
    const [cookies] = useCookies(['TOKEN']);

    return tokenIsValid(cookies.TOKEN) ? (
        <Outlet />
    ) : (
        <Navigate to='/login' replace={true} />
    );

};

export default ProtectedRoute;
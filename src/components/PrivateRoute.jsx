import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
    const token = useSelector(state => state.users.token);

    return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;

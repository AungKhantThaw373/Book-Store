// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const adminUsers = ['admin1', 'admin2']; // List of admin usernames

    if (!token) {
        return <Navigate to="/login" />;
    }

    const user = jwtDecode(token);
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    // Check if user has admin privileges
    if (adminUsers.includes(username)) {
        return children; // Allow admin to proceed
    }

    return children;
};

export default ProtectedRoute;

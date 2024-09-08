import { Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contects/UserContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext); // Access user and loading from UserContext
  const location = useLocation();

  if (loading) {
    // While user data is being fetched, show the loading spinner
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner aria-label="Loading spinner" />
      </div>
    );
  }

  if (user) {
    // If user is authenticated, render the children (protected components)
    return children;
  }

  // If not authenticated, redirect to the login page
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;

import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react'; // Spinner for the loading screen
import { UserContext } from '../contects/UserContext';

const Logout = () => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const { setUser } = useContext(UserContext); // Access the user context to update the user state
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogout = async () => {
    setLoading(true); // Start loading animation

    try {
      // Simulate any logout delay if necessary
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove token from localStorage
      localStorage.removeItem('token');

      // Clear user from context
      setUser(null);

      // Redirect to the home page (or login, as per your app flow)
      navigate(from, { replace: true });

      alert('Logout successful!');
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setLoading(false); // Stop loading animation (in case of delay)
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-teal-100 flex items-center justify-center">
        <Spinner aria-label="Loading spinner" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-teal-100 flex items-center justify-center">
      <button className="bg-red-700 px-8 py-2 text-white rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;

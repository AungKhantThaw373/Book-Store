import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../contects/UserContext';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const identifier = form.identifier.value; // Can be username or email
        const password = form.password.value;

        try {
            const response = await fetch(`https://bookstore-project-ues5.onrender.com/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
                localStorage.setItem('token', data.token); // Store JWT token

                // Fetch user data using the token
                const token = data.token;
                const userResponse = await fetch('https://bookstore-project-ues5.onrender.com/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const userData = await userResponse.json();
                if (userResponse.ok) {
                    setUser(userData);  // Set user in context with the fetched user data
                    console.log('User data:', userData); // Log user data
                } else {
                    setError('Failed to fetch user data after login');
                }

                // Redirect the user to the previous page or dashboard
                navigate(from, { replace: true });
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold">Login Form</h1>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <input
                                id="identifier"
                                name="identifier"
                                type="text"
                                placeholder="Username or Email"
                                required
                                className="border p-2 w-full"
                            />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                className="border p-2 w-full"
                            />
                            {error && <p className="text-red-600">{error}</p>}
                            <button className="bg-blue-500 text-white px-5 py-2">Login</button>
                        </form>
                        <p>
                            If you don't have an account, please{' '}
                            <Link to="/sign-up" className="text-blue-600">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

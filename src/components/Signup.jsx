import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleSignUp = async (event) => {
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch(`https://bookstore-project-ues5.onrender.com/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
                navigate('/login');
            } else {
                setError(data.error || 'Signup failed');
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
                        <h1 className="text-2xl font-semibold">Sign Up Form</h1>
                        <form onSubmit={handleSignUp} className="space-y-6">
                            <input id="username" name="username" type="text" placeholder="Username" required className="border p-2 w-full" />
                            <input id="email" name="email" type="email" placeholder="Email" required className="border p-2 w-full" />
                            <input id="password" name="password" type="password" placeholder="Password" required className="border p-2 w-full" />
                            {error && <p className='text-red-600'>{error}</p>}
                            <button className="bg-blue-500 text-white px-5 py-2">Sign Up</button>
                        </form>
                        <p>If you already have an account, please <Link to="/login" className="text-blue-600">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

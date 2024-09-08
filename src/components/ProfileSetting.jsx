import React, { useState, useContext, useRef } from 'react';
import { UserContext } from '../contects/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa'; // Import pen icon from react-icons

const ProfileSettings = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(user?.profile_pic_url || '');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [editUsername, setEditUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    // Create refs for the input fields and file input
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const currentPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setProfilePicPreview(URL.createObjectURL(file));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('currentPassword', currentPassword);
        formData.append('newPassword', newPassword);

        // Append the profile picture if a new file is selected; otherwise, send the existing image URL
        if (profilePic) {
            formData.append('profile_pic', profilePic);
        } else if (user.profile_pic_url) {
            formData.append('profile_pic_url', user.profile_pic_url);
        }
        console.log('Form Data:', formData);
        try {
            const response = await fetch('https://bookstore-project-ues5.onrender.com/api/profile/update', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log('Response Data:', data);
            if (!response.ok) throw new Error(data.error);

            setUser({
                ...user,
                username: data.username,
                email: data.email,
                profile_pic_url: data.profile_pic_url,
            });
            setSuccess('Profile updated successfully!');

            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 2000);

        } catch (error) {
            console.error('Update Error:', error.message);
            setError(error.message);
        }
    };

    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    const focusAndClearField = (fieldRef, setFieldValue) => {
        setFieldValue(''); // Clear the field value
        setTimeout(() => {
            fieldRef.current.focus(); // Focus on the input field
        }, 0); // Timeout of 0 milliseconds ensures this runs after the field is cleared
    };

    return (
        <div className="profile-settings-container max-w-md mx-auto p-6 mt-16 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            {error && <div className="bg-red-100 p-2 text-red-700 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 p-2 text-green-700 rounded mb-4">{success}</div>}
            <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="mb-4">
                    <img
                        src={profilePicPreview}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="block mx-auto mt-2 py-1 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
                    >
                        Change Profile Picture
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleProfilePicChange}
                    />
                </div>
                <div className="flex items-center">
                    <div className="flex-grow">
                        <label htmlFor="username" className="block text-sm font-medium">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!editUsername}
                            ref={usernameRef}
                        />
                    </div>
                    <FaPen
                        className="text-gray-500 cursor-pointer ml-2"
                        onClick={() => {
                            if (!editUsername) {
                                setEditUsername(true);
                                focusAndClearField(usernameRef, setUsername);
                            } else {
                                setEditUsername(false);
                            }
                        }}
                    />
                </div>
                <div className="flex items-center">
                    <div className="flex-grow">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!editEmail}
                            ref={emailRef}
                        />
                    </div>
                    <FaPen
                        className="text-gray-500 cursor-pointer ml-2"
                        onClick={() => {
                            if (!editEmail) {
                                setEditEmail(true);
                                focusAndClearField(emailRef, setEmail);
                            } else {
                                setEditEmail(false);
                            }
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium">Current Password</label>
                    <input
                        id="currentPassword"
                        type="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        disabled={!editPassword}
                        ref={currentPasswordRef}
                    />
                    <FaPen
                        className="text-gray-500 cursor-pointer ml-2"
                        onClick={() => {
                            if (!editPassword) {
                                setEditPassword(true);
                                focusAndClearField(currentPasswordRef, setCurrentPassword);
                            } else {
                                setEditPassword(false);
                            }
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={!editPassword}
                        ref={newPasswordRef}
                    />
                    <FaPen
                        className="text-gray-500 cursor-pointer ml-2"
                        onClick={() => {
                            if (!editPassword) {
                                setEditPassword(true);
                                focusAndClearField(newPasswordRef, setNewPassword);
                            } else {
                                setEditPassword(false);
                            }
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
                >
                    Update Profile
                </button>
                <button
                    type="button"
                    className="w-full py-2 px-4 bg-gray-500 text-white rounded-md mt-4 hover:bg-gray-600 transition"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;

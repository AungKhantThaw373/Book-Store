import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contects/UserContext';
import { FiSettings } from "react-icons/fi";  // Importing a settings icon from react-icons

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(UserContext);

    // Handle navigation
    const handleUploadBookClick = () => navigate('/admin/dashboard/upload');
    const handleManageBooksClick = () => navigate('/admin/dashboard/manage');
    const handleLogoutClick = () => navigate('/logout');
    const handleSettingsClick = () => navigate('/profile/settings');

    // Display loading state while user data is being fetched
    if (loading) {
        return <div className="text-center mt-16">Loading...</div>;
    }


    return (
        <div className="dashboard-container grid grid-cols-1 md:grid-cols-3 gap-8 p-4 mt-16">
            <div className="md:col-span-2 space-y-6">
                <div
                    className="dashboard-section flex justify-between p-4 border rounded-lg cursor-pointer bg-teal-100 hover:bg-teal-200"
                    onClick={handleUploadBookClick}
                >
                    <div className="left">
                        <h2 className="text-lg font-semibold">Upload Books</h2>
                        <p>Click here to upload new books to the store</p>
                    </div>
                    <div className="right">
                        <img src="https://www.svgrepo.com/show/38513/book-with-upload-symbol.svg" alt="Upload" className="w-24 h-24" />
                    </div>
                </div>

                <div
                    className="dashboard-section flex justify-between p-4 border rounded-lg cursor-pointer bg-teal-100 hover:bg-teal-200"
                    onClick={handleManageBooksClick}
                >
                    <div className="left">
                        <h2 className="text-lg font-semibold">Manage Books</h2>
                        <p>Click here to manage your book collection</p>
                    </div>
                    <div className="right items-center">
                        <img src="https://cdn0.iconfinder.com/data/icons/business-dual-color-glyph-set-6/128/settings_1-512.png" alt="Manage" className="w-24 h-24" />
                    </div>
                </div>

                <div
                    className="dashboard-section flex justify-between p-4 border rounded-lg cursor-pointer bg-teal-100 hover:bg-teal-200"
                    onClick={handleLogoutClick}
                >
                    <div className="left">
                        <h2 className="text-lg font-semibold">Logout</h2>
                        <p>Click here to logout</p>
                    </div>
                    <div className="right items-center">
                        <img src="https://www.svgrepo.com/show/135250/logout.svg" alt="Logout" className="w-24 h-24 items-center" />
                    </div>
                </div>
            </div>

            <div className="profile-section relative p-4 border lg:w-[300px] lg:h-[450px] rounded-lg bg-gray-300">
                <div className="cover-photo mb-4 w-full h-32 object-cover rounded-md"></div>

                <div className="profile-info flex flex-col items-center">
                    <div className="profile-photo mb-4 -mt-16">
                        <img
                            src={user?.profilePicUrl || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover object-center"
                        />
                    </div>

                    <h3 className="username text-lg font-semibold">
                        <p className="text-sm">
                            {user?.username || "Demo User"}
                        </p>
                    </h3>
                    <p className="email text-sm text-gray-500">
                        {user?.email || "example@gmail.com"}
                    </p>
                </div>

                <button
                    onClick={handleSettingsClick}
                    className="absolute top-4 right-4 p-2 bg-teal-200 rounded-full hover:bg-teal-300 transition-colors"
                >
                    <FiSettings className="w-6 h-6 text-gray-700" />  {/* Settings Icon */}
                </button>
            </div>
        </div>
    );
}

export default Dashboard;

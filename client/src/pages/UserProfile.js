
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserProfile() {
    // State for managing form inputs
    const [contactInfo, setContactInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [passwordInfo, setPasswordInfo] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    // Event handler for contact information change
    const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setContactInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    // Event handler for password change
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle contact information change
        try {
            const response = await axios.put('/api/contact/:id', contactInfo);
            console.log('Contact information updated successfully', response.data);
        } catch (error) {
            console.error('Error updating contact information:', error);
        }

        // Handle password change
        try {
            const { oldPassword, newPassword, confirmNewPassword } = passwordInfo;
            const response = await axios.put('/api/changePassword/:id', { currentPassword: oldPassword, newPassword, confirmPassword: confirmNewPassword });
            console.log('Password changed successfully', response.data);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    User Profile
                </h1>
            </div>
            {/* User Profile */}
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                        {/* Change Contact Information */}
                        <div className="bg-white rounded-lg shadow p-6 space-y-4 md:space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">Change Contact Information</h2>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={contactInfo.firstName}
                                        onChange={handleContactInfoChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={contactInfo.lastName}
                                        onChange={handleContactInfoChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={contactInfo.email}
                                        onChange={handleContactInfoChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>

                        {/* Change Password */}
                        <div className="bg-white rounded-lg shadow p-6 space-y-4 md:space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="oldPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Old password
                                    </label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        id="oldPassword"
                                        value={passwordInfo.oldPassword}
                                        onChange={handlePasswordChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="newPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        New password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        value={passwordInfo.newPassword}
                                        onChange={handlePasswordChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirmNewPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Confirm new password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        id="confirmNewPassword"
                                        value={passwordInfo.confirmNewPassword}
                                        onChange={handlePasswordChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}


// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';


// export default function UserProfile() {
//     return (
//       <div>
//         <Navbar />


//         <Footer />
//       </div>
//     );
//   }

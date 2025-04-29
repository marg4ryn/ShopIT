import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from '../../context/UserContext';

const UserProfile = ({ onEdit }) => {
    const { logout } = useAuth0();
    const { userData } = useUser();

    return (
        <div className="flex-grow flex pt-18 justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
                <div className="flex justify-center mb-4">
                    <img
                    src={userData.picture ? userData.picture : "/user-profile-default.png"}
                    alt="User Profile "
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
                    <p className="text-gray-500">{userData.email}</p>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                    Edit Profile
                    </button>
                    <button
                        onClick={() =>
                            logout({
                            logoutParams: {
                                returnTo: window.location.origin,
                            },
                            })
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                        Wyloguj się
                    </button>
                </div>
            </div>
        </div>
     );
};

export default UserProfile;

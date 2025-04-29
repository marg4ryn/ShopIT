import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from '../../context/UserContext';

const UserProfile = () => {
    const { logout } = useAuth0();
    const { userData } = useUser();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [onEdit, setOnEdit] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [initialData, setInitialData] = useState({
        userName: "",
        userEmail: "",
        imageUrl: "",
    });
    const [errors, setErrors] = useState({
        userName: "",
        userEmail: "",
    });

    return (
        <div className="flex-grow flex pt-18 justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
                {!onEdit && (<>
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
                </>)}
                {onEdit && (<>
                        <div className="flex flex-col">
                            <label htmlFor="userName" className="text-black font-lg font-bold pb-2">Username</label>
                            <input
                            id="userName"
                            type="text"
                            className={`w-full border text-black ${errors.userName ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                            value={userData.name}
                            onChange={(e) => {
                                setUserName(e.target.value);
                                setErrors({ ...errors, userName: "" });
                                setUnsavedChanges(true);
                            }}
                            />
                            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="userEmail" className="text-black font-lg font-bold pb-2">Email</label>
                            <input
                            id="userEmail"
                            type="text"
                            className={`w-full border text-black ${errors.userEmail ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                            value={userData.email}
                            onChange={(e) => {
                                setUserName(e.target.value);
                                setErrors({ ...errors, userEmail: "" });
                                setUnsavedChanges(true);
                            }}
                            />
                            {errors.userEmail && <p className="text-red-500 text-sm">{errors.userEmail}</p>}
                        </div>
                   </> )
                }
               
                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        onClick={() => setOnEdit(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-30"
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
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-30"
                        >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
     );
};

export default UserProfile;

import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from '../../context/UserContext';

const UserProfile = () => {
    const { logout } = useAuth0();
    const { userData } = useUser();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef();
    const [onEdit, setOnEdit] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [initialData, setInitialData] = useState({
        userName: "",
        userEmail: "",
        selectedImage: "",
    });
    const [errors, setErrors] = useState({
        userName: "",
    });

    const isModified =
    userName !== initialData.userName ||
    selectedImage !== initialData.selectedImage;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleLeave = () => {
        setIsModalOpen(false);
        setUnsavedChanges(false);
        navigate(-1);
    };
    
    const handleStay = () => {
        setIsModalOpen(false);
    };
    
    useEffect(() => {
        setInitialData({
            userName: userData.userName,
            userEmail: userData.email,
            imageUrl: userData.picture,
        });
    }, [userData]);

    const handleSave = async () => {
        setOnEdit(false)
        // const newErrors = {};
        // if (!name) newErrors.name = "Name is required";
       
        // if (Object.keys(newErrors).length > 0) {
        //   setErrors(newErrors);
        //   return;
        // }
      
        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("description", description);
      
        // try {
        //   const token = await getAccessTokenSilently();
        //   await editProduct(token, id, formData, deletedImages);
        //   sessionStorage.setItem("popupData", JSON.stringify({
        //     backgroundColor: "#008236",
        //     header: "Success!",
        //     content: "Product has been successfully saved!",
        //     showCloseButton: false
        //   }));
        //   setUnsavedChanges(false);
        //   setOnEdit(false);
        // } catch (error) {
        //   sessionStorage.setItem("popupData", JSON.stringify({
        //     backgroundColor: "red",
        //     header: "Failed to save product.",
        //     content: `${error}`,
        //     showCloseButton: true
        //   }));
        //   console.error(error);
        // }
      };

      return (
        <div className="flex-grow flex pt-18 justify-center items-center">
            <div className={`bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto ${onEdit ? "h-[420px]" : "h-[350px]"} flex flex-col justify-between`}>
                <div>
                    {!onEdit && (
                        <>
                            <div className="flex justify-center mb-4">
                                <img
                                    src={userData.picture ? userData.picture : "/user-profile-default.png"}
                                    alt="User Profile"
                                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                                />
                            </div>
    
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-800 mt-8">{userData.name}</h2>
                                <p className="text-gray-500 mt-4">{userData.email}</p>
                            </div>
                        </>
                    )}
    
                    {onEdit && (
                        <>
                            <div className="flex justify-center mb-4 relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    className="hidden"
                                />

                                <img
                                    src={selectedImage || userData.picture || "/user-profile-default.png"}
                                    alt="User Profile"
                                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                                    onClick={() => fileInputRef.current.click()}
                                />
                            </div>

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
    
                            <div className="flex flex-col mt-2">
                                <label htmlFor="userEmail" className="text-black font-lg font-bold pb-2">Email</label>
                                <input
                                    id="userEmail"
                                    type="text"
                                    disabled={true}
                                    className={`w-full border text-black ${errors.userEmail ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                                    value={userData.email}
                                />
                            </div>
                        </>
                    )}
                </div>
    
                <div className="mt-4 flex justify-center space-x-4">
                    {!onEdit && (
                        <button
                            onClick={() => setOnEdit(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-30"
                        >
                            Edit Profile
                        </button>
                    )}
                    {onEdit && (
                        <button
                            disabled={!isModified}
                            type="submit"
                            onClick={() => handleSave()}
                            className={`px-4 py-2 rounded-lg w-30 text-white transition-colors duration-200 ${
                                isModified ? "bg-green-600 hover:bg-green-700" : "bg-gray-500"
                            }`}
                        >
                            Save
                        </button>
                    )}
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
}

export default UserProfile;

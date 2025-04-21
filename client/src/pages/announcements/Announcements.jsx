import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchAnnouncements, deleteAnnouncement, editAnnouncement } from '../../api/Announcements';
import BackButton from '../../components/BackButton';
import DeleteModal from '../../components/DeleteModal'
import Popup from "../../components/Popup";

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupBackgroundColor, setPopupBackgroundColor] = useState('');
    const [popupHeader, setPopupHeader] = useState('');
    const [popupContent, setPopupContent] = useState('');
    const [popupShowCloseButton, setPopupShowCloseButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const popupData = sessionStorage.getItem("popupData");
      
        if (popupData) {
          setIsPopupOpen(false);
          const parsed = JSON.parse(popupData);
          setPopupBackgroundColor(parsed.backgroundColor);
          setPopupHeader(parsed.header);
          setPopupContent(parsed.content);
          setPopupShowCloseButton(parsed.showCloseButton);
          setIsPopupOpen(true);
      
          sessionStorage.removeItem("popupData");
        }
      }, []);
      
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const loadAnnouncements = async () => {
          try {
            const data = await fetchAnnouncements();
            setAnnouncements(data);
          } catch (err) {
            console.error('Failed to fetch announcements:', err);
          }
        };
      
        loadAnnouncements();
      }, []
    );

    const handleAddAnnouncement = () => {
        navigate(`/addannouncement`);
    };

    const handleViewAnnouncement = (id) => {
        navigate(`/viewannouncement/${id}`);
    };

    const handleEditAnnouncement = (id) => {
        navigate(`/editannouncement/${id}`);
    };

    const handleDeleteAnnouncement = (announcement) => {
        setAnnouncementToDelete(announcement);
        setIsDeleteModalOpen(true);
      };

    const handleDelete = async (id) => {
        setIsPopupOpen(false);
        try {
            await deleteAnnouncement(id);
            setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement._id !== id));
            setPopupBackgroundColor("#008236");
            setPopupHeader("Success!");
            setPopupContent("Announcement has been successfully deleted!");
            setPopupShowCloseButton(false);
            setIsPopupOpen(true);
        } catch (err) {
            setPopupBackgroundColor("red");
            setPopupHeader(`Failed to delete announcement.`);
            setPopupContent(`${err}`);
            setPopupShowCloseButton(true);
            setIsPopupOpen(true);
            console.error('Failed to delete announcement:', err);
        }
    };

    const handleToggleVisibility = async (adId, newVisibility) => {
        try {
            const adToUpdate = announcements.find(ad => ad._id === adId);
            if (adToUpdate) {
                await editAnnouncement(
                    adId, 
                    adToUpdate.title, 
                    adToUpdate.header, 
                    adToUpdate.content, 
                    adToUpdate.color, 
                    newVisibility
                );
                
                setAnnouncements(prevAds => 
                    prevAds.map(announcement =>
                        announcement._id === adId ? { ...announcement, visible: newVisibility } : announcement
                    )
                );
            }
        } catch (error) {
            console.error('Error updating visibility:', error);
        }
    };

    return (
        <main className="flex-grow pt-18">
            <div className="flex flex-col md:flex-row p-4 pb-4 mt-4 items-center justify-center">
                <div className="w-120 p-4 mt-4 flex flex-col items-center justify-center">   
                    <div className="text-center mt-4">
                        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
                            Announcements Management
                        </div>
                    </div>
                    <div className="mb-4 mt-8">
                        <button className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                            onClick={() => handleAddAnnouncement()}
                        >
                            Add new announcement
                        </button>
                    </div>
                    <ul className="mt-8">
                        {announcements.map((announcement) => (
                        <li key={announcement._id} className="flex justify-between items-center mb-4 w-150 p-2 bg-white border rounded">
                            <div className="flex flex-col">
                                <span className="font-semibold">{announcement.title}</span>
                            </div>
                            <div className="flex items-center">
                                <label className={`mr-2 px-4 w-26 py-2 ${announcement.visible ? 'bg-amber-600 hover:bg-amber-700' : 'bg-neutral-500 hover:bg-neutral-600'} text-white rounded flex items-center cursor-pointer`}>
                                    <input 
                                        type="checkbox" 
                                        id={`visible-${announcement._id}`}
                                        checked={announcement.visible} 
                                        onChange={() => handleToggleVisibility(announcement._id, !announcement.visible)} 
                                        className="sr-only"
                                    />
                                    <span className={`w-4 h-4 border-2 border-white rounded-sm mr-2 flex items-center justify-center transition duration-200 ${announcement.visible ? 'bg-white' : 'bg-transparent'}`}>
                                        {announcement.visible && (
                                            <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </span>
                                    Visible
                                </label>

                                <button className="mr-2 px-4 w-20 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                                    onClick={() => handleViewAnnouncement(announcement._id)}>
                                    View
                                </button>
                                <button className="mr-2 px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                    onClick={() => handleEditAnnouncement(announcement._id)}>
                                    Edit
                                </button>
                                <button className="mr-2 px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                                onClick={() => handleDeleteAnnouncement(announcement)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                        ))}
                    </ul>
                    <BackButton onClick={() => { navigate(-1); }} />
                </div>
            </div>
            <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            onDelete={handleDelete} 
            item={announcementToDelete}
            titleItem="announcement"
            itemLabel={announcementToDelete?.title}
            />
            <Popup
            isOpen={isPopupOpen}
            onClose={closePopup}
            backgroundColor={popupBackgroundColor}
            header={popupHeader}
            content={popupContent}
            showCloseButton={popupShowCloseButton}
            autoCloseTime={3000}
            />
        </main>    
    );
}
  
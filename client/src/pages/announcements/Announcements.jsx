import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchAnnouncements, deleteAnnouncement } from '../../api/Announcements';
import BackButton from '../../components/BackButton';
import DeleteModal from '../../components/DeleteModal'

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);
    const navigate = useNavigate();

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
        try {
            await deleteAnnouncement(id);
            setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement._id !== id));
        } catch (err) {
            console.error('Failed to delete announcement:', err);
        }
    };

    return (
        <main className="flex-grow pt-18">
            <div className="flex flex-col md:flex-row p-4 mt-4 items-center justify-center">
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
                            <div>
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
                    <BackButton />
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
        </main>    
    );
}
  
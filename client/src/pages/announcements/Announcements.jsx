import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAnnouncements, deleteAnnouncement, editAnnouncement } from '../../api/Announcements';
import BackButton from '../../components/BackButton';
import DeleteModal from '../../components/modals/DeleteModal'
import Popup from "../../components/modals/Popup";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Announcements() {
    const [loading, setLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupBackgroundColor, setPopupBackgroundColor] = useState('');
    const [popupHeader, setPopupHeader] = useState('');
    const [popupContent, setPopupContent] = useState('');
    const [popupShowCloseButton, setPopupShowCloseButton] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();
    const limit = 10;
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

    const loadAnnouncements = async (pageToLoad = 1) => {
      try {
        const result = await getAnnouncements(pageToLoad, limit);
        if (pageToLoad === 1) {
          setAnnouncements(result.announcements);
        } else {
          setAnnouncements(prev => [...prev, ...(result.announcements ?? [])]);
        }
        setHasMore(result.hasMore);
      } catch (err) {
        console.error(t('error.announcement.fetchAnnouncements'), err);
      } finally {
		setLoading(false);
      }
    };
    
    useEffect(() => {
      loadAnnouncements();
    }, []);

    const handleAddAnnouncement = () => {
        navigate(`/add-announcement`);
    };

    const handleViewAnnouncement = (id) => {
        navigate(`/view-announcement/${id}`);
    };

    const handleEditAnnouncement = (id) => {
        navigate(`/edit-announcement/${id}`);
    };

    const handleDeleteAnnouncement = (announcement) => {
        setAnnouncementToDelete(announcement);
        setIsDeleteModalOpen(true);
      };

    const handleDelete = async (id) => {
        const token = await getAccessTokenSilently();
        setIsPopupOpen(false);
        try {
            await deleteAnnouncement(token, id);
            setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement._id !== id));
            setPopupBackgroundColor("#008236");
            setPopupHeader(t('status.success'));
            setPopupContent(t('announcement.delete.success'));
            setPopupShowCloseButton(false);
            setIsPopupOpen(true);
        } catch (err) {
            setPopupBackgroundColor("red");
            setPopupHeader(t('announcement.delete.failed'));
            setPopupContent(`${err}`);
            setPopupShowCloseButton(true);
            setIsPopupOpen(true);
            console.error(t('error.announcement.delete'), err);
        }
    };

    const handleToggleVisibility = async (adId, newVisibility) => {
        const token = await getAccessTokenSilently();
        try {
            const adToUpdate = announcements.find(ad => ad._id === adId);
            if (adToUpdate) {
                await editAnnouncement(
                    token,
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
            console.error(t('error.announcement.editVisibility'), error);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadAnnouncements(nextPage);
    };

    return (
        <main className="flex-grow pt-18">
            {loading ? <LoadingSpinner /> : (
            <div className="flex flex-col md:flex-row p-4 pb-4 mt-4 items-center justify-center">
                <div className="w-120 p-4 mt-4 flex flex-col items-center justify-center">   
                    <div className="text-center mt-4">
                        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
                            {t('header.announcements')}
                        </div>
                    </div>
                    <div className="mb-4 mt-8">
                        <button className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer"
                            onClick={() => handleAddAnnouncement()}
                        >
                            {t('button.addAnnouncement')}
                        </button>
                    </div>
                    <ul className="mt-8">
                        {announcements?.map((announcement) => (
                        <li key={announcement._id} className="flex justify-between items-center mb-4 w-150 p-2 bg-white border rounded">
                            <div className="flex flex-col">
                                <span className="font-semibold">{announcement.title}</span>
                            </div>
                            <div className="flex items-center">
                                <label className={`mr-2 px-4 w-32 py-2 ${announcement.visible ? 'bg-amber-600 hover:bg-amber-700' : 'bg-neutral-500 hover:bg-neutral-600'} text-white rounded flex items-center cursor-pointer`}>
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
                                    {t('button.visible')}
                                </label>

                                <button className="mr-2 px-2 w-20 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer"
                                    onClick={() => handleViewAnnouncement(announcement._id)}>
                                    {t('button.view')}
                                </button>
                                <button className="mr-2 px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
                                    onClick={() => handleEditAnnouncement(announcement._id)}>
                                    {t('button.edit')}
                                </button>
                                <button className="mr-2 px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
                                onClick={() => handleDeleteAnnouncement(announcement)}>
                                    {t('button.delete')}
                                </button>
                            </div>
                        </li>
                        ))}
                    </ul>
                    <div className="flex text-center gap-8 items-center justify-center my-4">
                        <BackButton onClick={() => { navigate(-1); }} />
                        {hasMore && (
                            <button
                            onClick={handleLoadMore}
                            className="px-4 py-2  bg-green-600 hover:bg-green-700 text-white rounded flex-shrink-0 cursor-pointer"
                            >
                            {t('button.loadMore')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}
            <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            onDelete={handleDelete} 
            item={announcementToDelete}
            titleItem={t('modal.deleteAnnouncement')}
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
  
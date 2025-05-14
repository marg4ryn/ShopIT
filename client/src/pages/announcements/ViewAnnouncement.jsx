import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";
import { getAnnouncement } from "../../api/Announcements";
import BackButton from '../../components/BackButton';
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ViewAnnouncement() {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadAd = async () => {
      try {
        const data = await getAnnouncement (id);
        setAd(data);
      } catch (err) {
        console.error(t('error.announcement.fetchAnnouncement'), err);
      } finally {
				setLoading(false);
      }
    };

    loadAd();
  }, [id]);

  return (
    <main className="flex flex-col flex-grow">
      {loading ? <LoadingSpinner /> : (
        <div className="flex flex-col space-y-6 place-items-center">
      <div className="text-center pt-10 mt-26">
        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
           {t('header.viewAnnouncement')}
        </div>
      </div>
      <div className="flex flex-col items-center mt-10"> 
      <div className="w-2xs200 max-w-4xl h-60 flex items-center justify-center text-center px-4 rounded-xl shadow-lg" 
           style={{ backgroundColor: ad?.color || "#16a34a" }}>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {ad?.header}
          </h1>
          <div
            className="text-lg font-medium text-white"
            dangerouslySetInnerHTML={{ __html: ad?.content }}
          />
        </div>
      </div>
      <div className="flex text-center gap-8 items-center justify-center my-4">
        <BackButton onClick={() => { navigate(-1); }} />
        <button
          className="px-4 w-40 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          onClick={() => navigate(`/edit-announcement/${id}`)}
        >
          {t('button.edit')}
        </button>
      </div>
      </div></div>)}
    </main>
  );
}

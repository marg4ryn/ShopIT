import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnnouncement } from "../../api/Announcements";
import BackButton from '../../components/BackButton';

export default function ViewAnnouncement() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        const data = await getAnnouncement (id);
        setAd(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch announcement:", err);
      }
    };

    loadAd();
  }, [id]);

  return (
    <main className="flex flex-col flex-grow">
      <div className="text-center pt-10 mt-26">
        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
          Announcement Preview
        </div>
      </div>
      <div className="flex flex-col items-center mt-10"> 
      <div className="w-full max-w-4xl h-60 flex items-center justify-center text-center px-4 rounded-xl shadow-lg" 
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
      <div className="mt-4">
        <BackButton />
      </div>
      </div>
    </main>
  );
}

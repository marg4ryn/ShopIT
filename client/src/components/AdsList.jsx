import React, { useEffect, useState } from "react";
import { fetchAnnouncements } from "../api/Announcements";

export default function AdsList() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await fetchAnnouncements();
        setAds(data);
      } catch (error) {
        console.error("Error loading announcements:", error);
      }
    };
    loadAds();
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setDisableTransition(false);

        setTimeout(() => {
          setIsTransitioning(false);
          setDisableTransition(true);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 2000);

      }, 10000);

      return () => clearInterval(interval);
    }
  }, [ads]);

  if (!ads.length) return null;

  return (
    <div className="relative overflow-hidden h-60 my-10 rounded-xl bg-neutral-800 shadow-md">
      <div
        className={`
          flex w-[200%] h-full
          ${!disableTransition ? "transition-transform duration-1500 ease-in-out" : ""}
        `}
        style={{
          transform: isTransitioning ? "translateX(-50%)" : "translateX(0%)",
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center text-center px-4"
          style={{ backgroundColor: ads[currentIndex]?.color }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {ads[currentIndex].header}
            </h1>
            <div
              className="text-lg font-medium text-white"
              dangerouslySetInnerHTML={{ __html: ads[currentIndex].content }}
            />
          </div>
        </div>

        <div
          className="w-full h-full flex items-center justify-center text-center px-4"
          style={{ backgroundColor: ads[(currentIndex + 1) % ads.length]?.color }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {ads[(currentIndex + 1) % ads.length].header}
            </h1>
            <div
              className="text-lg font-medium text-white"
              dangerouslySetInnerHTML={{
                __html: ads[(currentIndex + 1) % ads.length].content,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

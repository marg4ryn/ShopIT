import React, { useEffect, useState } from "react";
import { fetchAnnouncements } from "../api/Announcements";

export default function AdsList() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
          setIsTransitioning(false);
        }, 2000);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [ads]);

  if (!ads.length) return null;

  return (
    <div className="relative overflow-hidden h-60 my-10 rounded-xl bg-neutral-800 shadow-md">
      <div
        className={`absolute inset-0 w-full h-full flex transition-transform duration-500 ease-in-out ${
          isTransitioning ? "transform -translate-x-full" : "transform translate-x-0"
        }`}
      >
        {/* Pierwsze ogłoszenie */}
        <div
          className="w-full h-full flex items-center justify-center text-center px-4"
          style={{ backgroundColor: ads[currentIndex]?.color || "#16a34a" }}
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

        {/* Drugie ogłoszenie (przechodzące na następne miejsce) */}
        <div
          className="absolute w-full h-full flex items-center justify-center text-center px-4"
          style={{
            backgroundColor: ads[(currentIndex + 1) % ads.length]?.color || "#16a34a",
            left: "100%",
            transition: "left 0.5s ease-in-out",
          }}
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
}

import React, { useEffect, useState, useRef } from "react";
import { getAllAnnouncements } from "../api/Announcements";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AdCarousel() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState("reset");
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);
  const prevIndexRef = useRef(0);
  const nextIndexRef = useRef(0);

  const autoScrollInterval = 5000;
  const transitionDuration = 2000;
  
  const slideTransforms = {
    next: "translate-x-[-66.666%]",
    prev: "translate-x-0",
    reset: "translate-x-[-33.333%]",
  };

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await getAllAnnouncements();
        const visibleAds = data.filter(ad => ad.visible === true);
        setAds(visibleAds);
        if (visibleAds.length > 1) {
          setCurrentIndex(0);
          prevIndexRef.current = (visibleAds.length - 1) % visibleAds.length;
          nextIndexRef.current = 1 % visibleAds.length;
        }
      } catch (error) {
        console.error("Error loading announcements:", error);
        setAds([]);
      }
    };

    loadAds();
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      setCurrentIndex(0);
      resetAutoScroll();
    }
  }, [ads]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (ads.length > 1) {
      const newPrev = (currentIndex - 1 + ads.length) % ads.length;
      const newNext = (currentIndex + 1) % ads.length;
      prevIndexRef.current = newPrev;
      nextIndexRef.current = newNext;
    }
  }, [currentIndex]);

  const resetAutoScroll = () => {
    if (ads.length <= 1) return;
  
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  
    intervalRef.current = setInterval(() => {
      const next = (currentIndexRef.current + 1) % ads.length;
      changeSlide(next, "next");
    }, autoScrollInterval);
  };

  const changeSlide = (targetIndex, direction) => {
    if (isTransitioning || targetIndex === currentIndexRef.current) return;
  
    targetIndex < currentIndexRef.current ?
      prevIndexRef.current = targetIndex:
      nextIndexRef.current = targetIndex;

    setIsTransitioning(true);
    setSlideDirection(direction);
  
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsTransitioning(false);
      setSlideDirection("reset");
      resetAutoScroll();
    }, transitionDuration);
  };
  
  const handleNextManual = () => {
    const newNext = (currentIndex + 1) % ads.length;
    changeSlide(newNext, "next");
  };
  
  const handlePrevManual = () => {
    const newPrev = (currentIndex - 1 + ads.length) % ads.length;
    changeSlide(newPrev, "prev");
  };
  
  const handleDotClick = (index) => {
    if (index !== currentIndex) {
      if (index === ads.length - 1 && currentIndex === 0 && ads.length > 2) {
        changeSlide(index, "prev");
      } else if (index === 0 && currentIndex === ads.length - 1) {
        changeSlide(index, "next");
      } else {
        const direction = index > currentIndex ? "next" : "prev";
        changeSlide(index, direction);
      }
    }
  };
  
  const getPrevIndex = () => prevIndexRef.current;
  const getNextIndex = () => nextIndexRef.current;

  if (!ads.length) return null;

  return (
    <div className="relative overflow-hidden h-60 my-10 rounded-xl bg-neutral-800 shadow-md">
      {(ads.length > 1) && (
      <div
        onClick={handlePrevManual}
        className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer flex group rounded-l-lg"
      >
        <div className="absolute left-0 top-0 bottom-0 w-30 group-hover:bg-[rgba(255,255,255,0.5)] transition-all duration-400 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-100">
            <span className="text-gray-600 text-2xl"><FaChevronLeft /></span>
          </div>
        </div>
      </div>)}

      {(ads.length > 1) && (
      <div
        onClick={handleNextManual}
        className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer flex group rounded-r-lg"
      >
        <div className="absolute right-0 top-0 bottom-0 w-30 group-hover:bg-[rgba(255,255,255,0.5)] transition-all duration-400 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-100">
            <span className="text-gray-600 text-2xl"><FaChevronRight /></span>
          </div>
        </div>
      </div>)}

      <div  className="flex w-[300%] h-full group">
        <div
          className={`flex w-[300%] h-full ${isTransitioning ? "transition-all duration-1500 ease-in-out" : ""} 
            ${slideTransforms[slideDirection] || "translate-x-0"}`}
        >
          <Ad ad={ads[getPrevIndex()]} />
          <Ad ad={ads[currentIndex]} />
          <Ad ad={ads[getNextIndex()]} />
        </div>

        {(ads.length > 1) && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>)}
      </div>
    </div>
  );
}

const Ad = ({ ad }) => (
  <div
    className="w-1/3 h-full flex items-center justify-center text-center px-4"
    style={{ backgroundColor: ad?.color }}
  >
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
);
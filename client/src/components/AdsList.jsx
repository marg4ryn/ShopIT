import React, { useEffect, useState, useRef } from "react";
import { fetchAnnouncements } from "../api/Announcements";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AdsList() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState("reset");
  const intervalRef = useRef(null);
  const autoScrollInterval = 5000;
  const transitionDuration = 2000;

  useEffect(() => {
    const loadAds = async () => {
      try {
        console.log("Loading ads...");
        const data = await fetchAnnouncements();
  
        const visibleAds = data.filter(ad => ad.visible === true);
  
        console.log("Visible ads:", visibleAds);
        setAds(visibleAds);
      } catch (error) {
        console.error("Error loading announcements:", error);
      }
    };
  
    loadAds();
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      console.log("Multiple ads loaded, starting auto-scroll...");
      setPrevIndex((ads.length - 1) % ads.length);
      setNextIndex(1 % ads.length);
      resetAutoScroll();
    } else {
      console.log("Not enough ads for auto-scroll.");
    }
  }, [ads]);

  const resetAutoScroll = () => {
    if (ads.length <= 1) {
      console.log("Not enough ads for auto-scroll.");
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      console.log("Auto-scroll interval cleared.");
    }

    console.log("Auto-scroll reset. Starting new interval.");
    intervalRef.current = setInterval(() => {
      console.log("Auto-scrolling to next slide...");
      changeSlide(nextIndex);
    }, autoScrollInterval);
  };

  const changeSlide = (targetIndex) => {
    if (isTransitioning) {
      console.log("Transition in progress, cannot change slide.");
      return;
    }

    console.log(`Changing slide to index ${targetIndex}, Direction: ${slideDirection}`);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      console.log("Auto-scroll interval cleared.");
    }

    setIsTransitioning(true);

    if (targetIndex > currentIndex) {
      console.log("Sliding to next...");
      setSlideDirection("next");
    } else if (targetIndex < currentIndex) {
      console.log("Sliding to prev...");
      setSlideDirection("prev");
    }

    setTimeout(() => {
      setIsTransitioning(false);
      console.log("Transition completed.");
      resetAutoScroll();
    }, transitionDuration);

    setCurrentIndex(targetIndex);
    setPrevIndex((targetIndex - 1 + ads.length) % ads.length);
    setNextIndex((targetIndex + 1) % ads.length);
    setSlideDirection("reset");
  };

  const handleNextManual = () => {
    console.log("Manually moving to next slide...");
    changeSlide(nextIndex);
  };

  const handlePrevManual = () => {
    console.log("Manually moving to previous slide...");
    changeSlide(prevIndex);
  };

  const handleDotClick = (index) => {
    if (index === currentIndex) {
      console.log("Clicked dot corresponds to the current slide, no action taken.");
      return;
    }

    console.log(`Clicked dot for slide index ${index}`);
    changeSlide(index);
  };
  
  if (!ads.length) return null;

  return (
    <div className="relative overflow-hidden h-60 my-10 rounded-xl bg-neutral-800 shadow-md">
      {/* Strzałka w lewo */}
      <button
        className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        onClick={handlePrevManual}
      >
        <FaChevronLeft />
      </button>

      {/* Strzałka w prawo */}
      <button
        className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        onClick={handleNextManual}
      >
        <FaChevronRight />
      </button>

      <div
  className={`flex w-[300%] h-full ${isTransitioning ? "transition-all duration-1500 ease-in-out" : ""} 
    ${slideDirection === "next" ? "translate-x-[-33.333%]" : 
      slideDirection === "prev" ? "translate-x-[33.333%]" : 
      slideDirection === "reset" ? "translate-x-0" : "translate-x-0"}`}
>

        {/* Poprzednie ogłoszenie */}
        <div
          className="w-1/3 h-full flex items-center justify-center text-center px-4"
          style={{ backgroundColor: ads[prevIndex]?.color }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {ads[prevIndex].header}
            </h1>
            <div
              className="text-lg font-medium text-white"
              dangerouslySetInnerHTML={{ __html: ads[prevIndex].content }}
            />
          </div>
        </div>

        {/* Bieżące ogłoszenie */}
        <div
          className="w-1/3 h-full flex items-center justify-center text-center px-4"
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

        {/* Następne ogłoszenie */}
        <div
          className="w-1/3 h-full flex items-center justify-center text-center px-4"
          style={{ backgroundColor: ads[nextIndex]?.color }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {ads[nextIndex].header}
            </h1>
            <div
              className="text-lg font-medium text-white"
              dangerouslySetInnerHTML={{ __html: ads[nextIndex].content }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

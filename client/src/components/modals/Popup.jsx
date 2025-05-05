import React, { useEffect, useState } from 'react';

function Popup({ isOpen, onClose, backgroundColor, header, content, showCloseButton, autoCloseTime }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      setIsClosing(false);
    } else {
      setIsOpening(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !showCloseButton && autoCloseTime) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(onClose, 500);
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, showCloseButton, autoCloseTime, onClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed bottom-15 left-0 right-0 bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500
        ${isClosing || !isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}
      `}
    >
      <div
        className={`relative bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform transition-all duration-500 ease-in-out ${isOpening ? 'translate-y-0' : 'translate-y-10'} ${isClosing ? 'translate-y-10 opacity-0' : 'opacity-100'}`}
        style={{ backgroundColor: backgroundColor }}
      >
        {showCloseButton && (
          <button
            onClick={() => {
              setIsClosing(true);
              setTimeout(onClose, 500);
            }}
            className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-gray-300"
            aria-label="Close"
          >
            &times;
          </button>
        )}
  
        <h2 className="text-2xl font-bold text-white mb-4">{header}</h2>
        <p className="text-white text-justify">{content}</p>
      </div>
    </div>
  );
  
}

export default Popup;

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
    <div className={`fixed bottom-30 left-0 right-0 bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div
        className={`bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform transition-all duration-500 ease-in-out ${isOpening ? 'translate-y-0' : 'translate-y-10'} ${isClosing ? 'translate-y-10 opacity-0' : 'opacity-100'}`}
        style={{ backgroundColor: backgroundColor }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">{header}</h2>
        <p className="text-white">{content}</p>

        {showCloseButton && (
          <button
            onClick={() => {
              setIsClosing(true);
              setTimeout(onClose, 500);
            }}
            className="px-6 py-2 text-white rounded bg-gray-500 hover:bg-gray-600 mt-4"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default Popup;

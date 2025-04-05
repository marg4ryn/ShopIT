import React, { useEffect } from 'react';

function Popup({ isOpen, onClose, backgroundColor, header, content, showCloseButton, autoCloseTime }) {
  useEffect(() => {
    if (isOpen && !showCloseButton && autoCloseTime) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, showCloseButton, autoCloseTime, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{ backgroundColor: backgroundColor }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">{header}</h2>
        <p className="text-white">{content}</p>

        {showCloseButton && (
          <button
            onClick={onClose}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default Popup;

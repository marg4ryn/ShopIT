import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl w-14 p-2 rounded text-white hover:text-black hover:bg-gray-100 transition duration-200"
        aria-label="Change language"
      >
        <FontAwesomeIcon icon={faGlobe} />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-14 bg-white border border-gray-300 rounded shadow">
          <button
            onClick={() => changeLanguage('en')}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('pl')}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            PL
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

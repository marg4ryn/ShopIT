import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const LanguageSwitcher = ({ direction = 'down' }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const dropdownPosition =
    direction === 'up'
      ? 'bottom-full mb-2'
      : 'mt-2';

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="text-xl w-12 p-2 rounded text-white hover:text-black hover:bg-gray-100 transition duration-200"
        aria-label="Change language"
      >
        <FontAwesomeIcon icon={faGlobe} />
      </button>

      {open && (
        <div
          className={`absolute z-10 w-12 bg-white border border-gray-300 rounded shadow ${dropdownPosition}`}
        >
          <button
            onClick={() => changeLanguage('en')}
            className="text-black block w-full px-2 py-1 text-center hover:bg-gray-100 text-sm"
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('pl')}
            className="text-black block w-full px-2 py-1 text-center hover:bg-gray-100 text-sm"
          >
            PL
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

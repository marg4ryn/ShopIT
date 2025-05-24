import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    return (
      <footer className="bg-green-700 text-white text-center w-full p-2 gap-2 flex flex-row justify-between">
        <div className="flex flex-row items-center justify-start">
          <p className="w-80">&copy; {new Date().getFullYear()} {t('others.ShopIt')}. {t('footer.rightsReserved')}</p>
        </div>
        <div className="flex flex-row items-center justify-end">
          <button
            onClick={() => navigate(`/statute`)}
            className="w-30 underline hover:text-gray-400 focus:outline-none bg-transparent border-none cursor-pointer"
          >
            {t('button.statute')}
          </button>
          <button
            onClick={() => navigate(`/privacy-policy`)}
            className="w-40 underline hover:text-gray-400 focus:outline-none bg-transparent border-none cursor-pointer mr-6"
          >
            {t('button.privacyPolicy')}
          </button>
          <LanguageSwitcher direction="up"/>
        </div>
        
        
      </footer>
    );
  };
  
  export default Footer;
  
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    return (
      <footer className="bg-green-700 text-white text-center w-full p-4 flex justify-center items-center gap-6">
        <p className="m-0">&copy; {new Date().getFullYear()} {t('others.ShopIt')}. {t('footer.rightsReserved')}</p>
        <button
          onClick={() => navigate(`/statute`)}
          className="underline hover:text-gray-400 focus:outline-none bg-transparent border-none p-0 cursor-pointer"
        >
          {t('button.statute')}
        </button>
        <button
          onClick={() => navigate(`/privacy-policy`)}
          className="underline hover:text-gray-400 focus:outline-none bg-transparent border-none p-0 cursor-pointer"
        >
          {t('button.privacyPolicy')}
        </button>
        <LanguageSwitcher direction="up"/>
      </footer>
    );
  };
  
  export default Footer;
  
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    
    return (
      <footer className="bg-green-700 text-white text-center w-full p-4">
        <p>&copy; {new Date().getFullYear()} ShopIt. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  
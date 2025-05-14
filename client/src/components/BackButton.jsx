import { useTranslation } from 'react-i18next';

const BackButton = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-40 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
    >
      {t('button.back')}
    </button>
  );
};

export default BackButton;

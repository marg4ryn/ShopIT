import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleBackClick}
      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
    >
      Back
    </button>
  );
};

export default BackButton;

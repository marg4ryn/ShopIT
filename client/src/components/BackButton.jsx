const BackButton = ({ onClick }) => {

  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
    >
      Back
    </button>
  );
};

export default BackButton;

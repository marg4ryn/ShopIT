import { useTranslation } from 'react-i18next';

const UnsavedChangesModal = ({ 
    isOpen, 
    onClose,
    onExit
  }) => {
    const { t } = useTranslation();
    
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h3 className="text-xl text-center font-bold mb-4">You have unsaved changes. Are you sure you want to exit?</h3>
          <div className="flex justify-center mt-6 gap-6">
            <button
              onClick={onClose}
              className="w-50 px-4 py-2 text-white rounded bg-green-600 hover:bg-green-700"
            >
              Stay
            </button>
            <button
              onClick={onExit}
              className="w-50 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UnsavedChangesModal;
  
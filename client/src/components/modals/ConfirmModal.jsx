import { useTranslation } from 'react-i18next';

const ConfirmModal = ({ isOpen, message, onCancel, onConfirm }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h3 className="text-xl text-center font-bold mb-4">{message.title}</h3>
          <p className="text-center text-gray-600 mb-4">{message.body}</p>
          <div className="flex justify-center mt-6 gap-6">
            <button onClick={onCancel} className="px-4 py-2 bg-green-600 text-white rounded">{t('button.cancel')}</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">{t('button.leave')}</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;
  
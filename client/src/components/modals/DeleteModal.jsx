import { useTranslation } from 'react-i18next';

const DeleteModal = ({ 
  isOpen, 
  onClose, 
  onDelete, 
  item, 
  titleItem, 
  itemLabel
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-black">
        <h3 className="text-xl text-center font-bold mb-4">{t('modal.delete')}{titleItem}?</h3>
        <p className="text-lg text-center font-semibold">{itemLabel}</p>
        <div className="flex justify-center mt-6 gap-6">
          <button
            onClick={onClose}
            className="w-50 px-4 py-2 text-white rounded bg-gray-500 hover:bg-gray-600 cursor-pointer"
          >
            {t('button.cancel')}
          </button>
          <button
            onClick={() => {
              onDelete(item?._id);
              onClose();
            }}
            className="w-50 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            {t('button.yes')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

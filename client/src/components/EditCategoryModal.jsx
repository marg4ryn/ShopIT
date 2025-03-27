import React, { useEffect, useState } from 'react';

 const EditCategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (category?.name) {
      setNewCategoryName(category.name);
    }
  }, [category]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onSave(newCategoryName);
    }
  };

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center">
        
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl text-center font-bold mb-4">Edit Category Name</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="categoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center mt-6 gap-6">
            <button
              type="button"
              onClick={onClose}
              className="w-50 px-4 py-2 text-white rounded bg-red-600 hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                await onSave(newCategoryName);
                onClose();
              }}
              className="w-50 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
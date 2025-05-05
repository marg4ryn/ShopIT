import React, { useEffect, useState } from 'react';

const EditCategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [initialData, setInitialData] = useState({ categoryName: "" });
  const [errors, setErrors] = useState({ categoryName: "" });

  useEffect(() => {
    if (category?.name) {
      setNewCategoryName(category.name);
      setInitialData({ categoryName: category.name });
    }
  }, [category]);

  const isModified = newCategoryName !== initialData.categoryName;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!newCategoryName.trim()) {
      newErrors.categoryName = "Category name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSave(newCategoryName);
      onClose();
    } catch (error) {
      console.error("Saving failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl text-center font-bold mb-4">Edit Category Name</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="categoryName"
              maxLength={50}
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
                setErrors({ ...errors, categoryName: "" });
              }}
              className={`${errors.categoryName ? 'border-red-500' : 'border-gray-300'} w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-black`}
            />
            {errors.categoryName && <p className="text-red-500 text-sm mt-2">{errors.categoryName}</p>}
          </div>
          <div className="flex justify-center mt-6 gap-6">
            <button
              type="button"
              onClick={onClose}
              className="w-40 px-4 py-2 text-white rounded bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isModified}
              className={`p-2 rounded w-40 text-white transition-colors duration-200 ${
                isModified ? "bg-green-600 hover:bg-green-700" : "bg-gray-500"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;

import React, { useEffect, useState } from 'react';
import { fetchCategories, addCategory, editCategory, deleteCategory } from '../api/categories';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const data = await addCategory(newCategory);
        setCategories([...categories, data]);
        setNewCategory('');
      } catch (err) {
        console.error('Failed to add category:', err);
      }
    }
  };

  const handleEditCategory = async (id) => {
    const newCategoryName = prompt('New category name:');
    if (newCategoryName) {
      try {
        const data = await editCategory(id, newCategoryName);
        setCategories(categories.map(category => category._id === id ? data : category));
      } catch (err) {
        console.error('Failed to edit category:', err);
      }
    }
  };
  
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };
  
  return (
    <div className="p-4 mt-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Category management</h2>
      <div className="mb-4 mt-8">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded bg-white focus:outline-none focus:ring-3 focus:ring-black"
          placeholder="Enter category name"
        />
        <button onClick={handleAddCategory} className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded">
          Add new category
        </button>
      </div>
      <ul className="mt-8">
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between items-center mb-4 w-120 p-2 bg-white border rounded">
            <span>{category.name}</span>
            <div>
              <button onClick={() => handleEditCategory(category._id)} className="mr-2 px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                Edit
              </button>
              <button onClick={() => handleDeleteCategory(category._id)} className="mr-2 px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

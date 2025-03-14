import React, { useEffect, useState } from 'react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const addCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await fetch('http://localhost:3000/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newCategory }),
        });
        const data = await response.json();
        setCategories([...categories, data]);
        setNewCategory('');
      } catch (err) {
        console.error('Error adding category:', err);
      }
    }
  };

  const editCategory = async (id) => {
    const newCategoryName = prompt('New category name:');
    if (newCategoryName) {
      try {
        const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newCategoryName }),
        });
        const data = await response.json();
        setCategories(categories.map(category => category.id === id ? data : category));
      } catch (err) {
        console.error('Error editing category:', err);
      }
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/categories/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 mt-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Category management</h2>
      <div className="mb-4 mt-8">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded bg-white"
          placeholder="Enter category name"
        />
        <button onClick={addCategory} className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded">
          Add new category
        </button>
      </div>
      <ul className="mt-8">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center mb-2 mb-4 w-120 p-2 bg-white border rounded">
            <span>{category.name}</span>
            <div>
              <button onClick={() => editCategory(category.id)} className="mr-2 px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                Edit
              </button>
              <button onClick={() => deleteCategory(category.id)} className="mr-2 px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
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

import React, { useState } from 'react';

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Elektronika' },
    { id: 2, name: 'Odzież' },
    { id: 3, name: 'Zabawki' },
  ]);
  const [newCategory, setNewCategory] = useState('');

  // Funkcja do dodania nowej kategorii
  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
      setNewCategory('');
    }
  };

  // Funkcja do edytowania kategorii
  const editCategory = (id) => {
    const newCategoryName = prompt('Nowa nazwa kategorii:');
    if (newCategoryName) {
      setCategories(categories.map(category => 
        category.id === id ? { ...category, name: newCategoryName } : category
      ));
    }
  };

  // Funkcja do usuwania kategorii
  const deleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Zarządzanie Kategoriami</h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded"
          placeholder="Dodaj nową kategorię"
        />
        <button
          onClick={addCategory}
          className="ml-2 p-2 bg-green-500 text-white rounded"
        >
          Dodaj
        </button>
      </div>

      <ul>
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center mb-2 p-2 border rounded">
            <span>{category.name}</span>
            <div>
              <button
                onClick={() => editCategory(category.id)}
                className="mr-2 p-1 bg-blue-500 text-white rounded"
              >
                Edytuj
              </button>
              <button
                onClick={() => deleteCategory(category.id)}
                className="p-1 bg-red-500 text-white rounded"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

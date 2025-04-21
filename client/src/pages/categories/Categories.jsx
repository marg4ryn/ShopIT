import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCategories, addCategory, editCategory, deleteCategory } from '../../api/categories';
import BackButton from '../../components/BackButton';
import EditCategoryModal from '../../components/EditCategoryModal'
import DeleteModal from '../../components/DeleteModal'
import Popup from "../../components/Popup";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;
    const [newCategory, setNewCategory] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupBackgroundColor, setPopupBackgroundColor] = useState('');
    const [popupHeader, setPopupHeader] = useState('');
    const [popupContent, setPopupContent] = useState('');
    const [popupShowCloseButton, setPopupShowCloseButton] = useState(false);
    const [errors, setErrors] = useState({
      categoryName: ""
    });

    const navigate = useNavigate();

    const loadCategories = async (pageToLoad = 1) => {
      try {
        const result = await getCategories(pageToLoad, limit);
        if (pageToLoad === 1) {
          setCategories(result.categories);
        } else {
          setCategories(prev => [...prev, ...(result.categories ?? [])]);
        }
        setHasMore(result.hasMore);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    
    useEffect(() => {
      loadCategories();
    }, []);

    const closePopup = () => {
      setIsPopupOpen(false);
    };

    const handleAddCategory = async () => {
      setIsPopupOpen(false);

      const newErrors = {};
      if (!newCategory) newErrors.categoryName = "Category name is required";
    
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      if (newCategory.trim()) {
        try {
          const data = await addCategory(newCategory);
          setCategories([...categories, data]);
          setNewCategory('');
          setPopupBackgroundColor("#008236");
          setPopupHeader("Success!");
          setPopupContent("Category has been successfully created!");
          setPopupShowCloseButton(false);
          setIsPopupOpen(true);
        } catch (err) {
          setPopupBackgroundColor("red");
          setPopupHeader(`Failed to create category.`);
          setPopupContent(`${err}`);
          setPopupShowCloseButton(true);
          setIsPopupOpen(true);
          console.error('Failed to create category:', err);
        }
      }
    };
  
    const handleEditCategory = (category) => {
      setCategoryToEdit(category);
      setIsEditModalOpen(true);
    };

    const handleSaveCategory = async (newCategoryName) => {
      setIsPopupOpen(false);
      try {
        const updatedCategory = await editCategory(categoryToEdit._id, newCategoryName);
        setCategories(categories.map(category => category._id === updatedCategory._id ? updatedCategory : category));
        setIsEditModalOpen(false);
        setPopupBackgroundColor("#008236");
        setPopupHeader("Success!");
        setPopupContent("Category has been successfully saved!");
        setPopupShowCloseButton(false);
        setIsPopupOpen(true);
      } catch (err) {
        setPopupBackgroundColor("red");
        setPopupHeader(`Failed to save category.`);
        setPopupContent(`${err}`);
        setPopupShowCloseButton(true);
        setIsPopupOpen(true);
        console.error('Failed to save category:', err);
      }
    };

    const handleDeleteCategory = (category) => {
      setIsPopupOpen(false);
      setCategoryToDelete(category);
      setIsDeleteModalOpen(true);
    };

    const handleDelete = async (id) => {
      try {
        await deleteCategory(id);
        setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
        setPopupBackgroundColor("#008236");
        setPopupHeader("Success!");
        setPopupContent("Category has been successfully deleted!");
        setPopupShowCloseButton(false);
        setIsPopupOpen(true);
      } catch (err) {
        setPopupBackgroundColor("red");
        setPopupHeader(`Failed to delete category.`);
        setPopupContent(`${err}`);
        setPopupShowCloseButton(true);
        setIsPopupOpen(true);
        console.error('Failed to delete category:', err);
      }
    };

    const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      loadCategories(nextPage);
    };

    return (
        <main className="flex-grow pt-18">
        <div className="flex flex-col md:flex-row p-4 mt-4 items-center justify-center">
          <div className="w-120 p-4 mt-4 flex flex-col items-center justify-center">            
            <div className="text-center mt-4">
              <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
                  Categories Management
              </div>
            </div>
            <div className="mb-4 mt-8 flex items-center">
              <input
                id="categoryName"
                type="text"
                maxLength={50}
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setErrors({ ...errors, categoryName: "" });
                }}
                className={`${errors.categoryName ? 'border-red-500' : 'border-gray-300'} p-2 border rounded bg-white focus:outline-none focus:ring-3 focus:ring-black`}
                placeholder="Enter category name"
              />
              <button 
                onClick={handleAddCategory} 
                className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded flex-shrink-0"
              >
                Add new category
              </button>
            </div>
            {errors.categoryName && <p className="text-red-500 text-sm mt-2">{errors.categoryName}</p>}

            <ul className="mt-8">
                {categories?.map((category) => (
                <li key={category._id} className="flex justify-between items-center mb-4 w-120 p-2 bg-white border rounded">
                    <span className="font-semibold">{category.name}</span>
                    <div>
                    <button onClick={() => handleEditCategory(category)} className="mr-2 px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                        Edit
                    </button>
                    <button onClick={() => handleDeleteCategory(category)} className="mr-2 px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                        Delete
                    </button>
                    </div>
                </li>
                ))}
              </ul>
              <div className="flex text-center gap-8 items-center justify-center my-4">
                <BackButton onClick={() => { navigate(-1); }} />
                {hasMore && (
                  <button
                    onClick={handleLoadMore}
                    className="px-4 py-2  bg-green-600 hover:bg-green-700 text-white rounded flex-shrink-0"
                  >
                    Load more
                  </button>
                )}
              </div>
            </div>
        </div>
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveCategory}
          category={categoryToEdit}
        />
        <DeleteModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onDelete={handleDelete} 
          item={categoryToDelete}
          titleItem="category"
          itemLabel={categoryToDelete?.name}
        />
        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup}
          backgroundColor={popupBackgroundColor}
          header={popupHeader}
          content={popupContent}
          showCloseButton={popupShowCloseButton}
          autoCloseTime={3000}
        />
        </main>
    );
  }
  
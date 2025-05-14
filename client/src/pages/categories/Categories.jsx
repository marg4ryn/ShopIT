import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { getCategories, addCategory, editCategory, deleteCategory } from '../../api/categories';
import { useAuth0 } from "@auth0/auth0-react";
import BackButton from '../../components/BackButton';
import EditCategoryModal from '../../components/modals/EditCategoryModal'
import DeleteModal from '../../components/modals/DeleteModal'
import Popup from "../../components/modals/Popup";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Categories() {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
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
    const [errors, setErrors] = useState({categoryName: "" });
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();
    const limit = 10;
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
        console.error(t('error.category.fetchCategories'), err);
      } finally {
        setLoading(false);
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
      if (!newCategory) newErrors.categoryName = t('form.error.categoryNameRequired');
    
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      if (newCategory.trim()) {
        try {
          const token = await getAccessTokenSilently();
          const data = await addCategory(token, newCategory);
          setCategories([...categories, data]);
          setNewCategory('');
          setPopupBackgroundColor("#008236");
          setPopupHeader(t('status.success'));
          setPopupContent(t('category.create.success'));
          setPopupShowCloseButton(false);
          setIsPopupOpen(true);
        } catch (err) {
          setPopupBackgroundColor("red");
          setPopupHeader(t('category.create.failed'));
          setPopupContent(`${err}`);
          setPopupShowCloseButton(true);
          setIsPopupOpen(true);
          console.error(t('error.category.create'), err);
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
        const token = await getAccessTokenSilently();
        const updatedCategory = await editCategory(token, categoryToEdit._id, newCategoryName);
        setCategories(categories.map(category => category._id === updatedCategory._id ? updatedCategory : category));
        setIsEditModalOpen(false);
        setPopupBackgroundColor("#008236");
        setPopupHeader(t('status.success'));
        setPopupContent(t('category.edit.success'));
        setPopupShowCloseButton(false);
        setIsPopupOpen(true);
      } catch (err) {
        setPopupBackgroundColor("red");
        setPopupHeader(t('category.edit.failed'));
        setPopupContent(`${err}`);
        setPopupShowCloseButton(true);
        setIsPopupOpen(true);
        console.error(t('error.category.edit'), err);
      }
    };

    const handleDeleteCategory = (category) => {
      setIsPopupOpen(false);
      setCategoryToDelete(category);
      setIsDeleteModalOpen(true);
    };

    const handleDelete = async (id) => {
      try {
        const token = await getAccessTokenSilently();
        await deleteCategory(token, id);
        setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
        setPopupBackgroundColor("#008236");
        setPopupHeader(t('status.success'));
        setPopupContent(t('category.delete.success'));
        setPopupShowCloseButton(false);
        setIsPopupOpen(true);
      } catch (err) {
        setPopupBackgroundColor("red");
        setPopupHeader(t('category.delete.failed'));
        setPopupContent(`${err}`);
        setPopupShowCloseButton(true);
        setIsPopupOpen(true);
        console.error(t('error.category.delete'), err);
      }
    };

    const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      loadCategories(nextPage);
    };

    return (
        <main className="flex-grow pt-18">
        {loading ? <LoadingSpinner /> : (
        <div className="flex flex-col md:flex-row p-4 mt-4 items-center justify-center">
          <div className="w-120 p-4 mt-4 flex flex-col items-center justify-center">            
            <div className="text-center mt-4">
              <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
                  {t('header.categories')}
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
                className={`${errors.categoryName ? 'border-red-500' : 'border-gray-300'} w-60 p-2 border rounded bg-white focus:outline-none focus:ring-3 focus:ring-black`}
                placeholder={t('placeholder.categoryName')}
              />
              <button 
                onClick={handleAddCategory} 
                className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded flex-shrink-0"
              >
                {t('button.addCategory')}
              </button>
            </div>
            {errors.categoryName && <p className="text-red-500 text-sm mt-2">{errors.categoryName}</p>}

            <ul className="mt-8">
                {categories?.map((category) => (
                <li key={category._id} className="flex justify-between items-center mb-4 w-120 p-2 bg-white border rounded">
                    <span className="font-semibold">{category.name}</span>
                    <div>
                    <button onClick={() => handleEditCategory(category)} className="mr-2 px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                        {t('button.edit')}
                    </button>
                    <button onClick={() => handleDeleteCategory(category)} className="mr-2 px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                        {t('button.delete')}
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
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex-shrink-0"
                  >
                    {t('button.loadMore')}
                  </button>
                )}
              </div>
            </div>
        </div>
      )}
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
          titleItem={t('modal.deleteCategory')}
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
  
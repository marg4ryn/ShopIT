import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { deleteProduct, getFilteredProducts } from '../../api/products';
import { useSearchTerm } from '../../context/SearchContext';
import { useFilterContext } from '../../context/FilterContext'; 
import Sidebar from "../../components/Sidebar";
import BackButton from '../../components/BackButton';
import DeleteModal from '../../components/modals/DeleteModal'
import Popup from "../../components/modals/Popup";
import { useAuth0 } from "@auth0/auth0-react";

export default function Products() {
    const { getAccessTokenSilently } = useAuth0();
    const { sortOption, filters, updateSortOption, updateFilters } = useFilterContext();
    const { searchTerm } = useSearchTerm();
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const page = useRef(1);
    const limit = 5;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupBackgroundColor, setPopupBackgroundColor] = useState('');
    const [popupHeader, setPopupHeader] = useState('');
    const [popupContent, setPopupContent] = useState('');
    const [popupShowCloseButton, setPopupShowCloseButton] = useState(false);
    const navigate = useNavigate();

    const loadProducts = async (reset = false) => {
      try {
        const result = await getFilteredProducts({
            category: filters.selectedCategories.join(','),
            minPrice: filters.priceFrom,
            maxPrice: filters.priceTo,
            sortOption: sortOption,
            search: searchTerm,
            page: reset ? 1 : page.current + 1,
            limit: limit
        });

        if (reset) {
            setProducts(result.products);
            page.current = 1;
        } else {
            page.current++;
            setProducts(prev => [...prev, ...result.products]);
        }

        setHasMore(result.hasMore);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    useEffect(() => {
        loadProducts(true);
    }, [sortOption, filters, searchTerm]);

    const handleLoadMore = () => {
        loadProducts(false);
    };

    const handleSortChange = (newSortOption) => {
        updateSortOption(newSortOption);
    };

    const handleFilterChange = (newFilters) => {
        updateFilters(newFilters);
    };

    useEffect(() => {
        const popupData = sessionStorage.getItem("popupData");
        
        if (popupData) {
            setIsPopupOpen(false);
            const parsed = JSON.parse(popupData);
            setPopupBackgroundColor(parsed.backgroundColor);
            setPopupHeader(parsed.header);
            setPopupContent(parsed.content);
            setPopupShowCloseButton(parsed.showCloseButton);
            setIsPopupOpen(true);
        
            sessionStorage.removeItem("popupData");
        }
    }, []);
        
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleAddProduct = () => {
        navigate(`/add-product`);
    };

    const handleViewProduct = (id) => {
        navigate(`/view-product/${id}`);
    };

    const handleEditProduct = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDeleteProduct = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
      };

    const handleDelete = async (id) => {
        setIsPopupOpen(false);
        try {
            const token = await getAccessTokenSilently();
            await deleteProduct(token, id);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
            setPopupBackgroundColor("#008236");
            setPopupHeader("Success!");
            setPopupContent("Product has been successfully deleted!");
            setPopupShowCloseButton(false);
            setIsPopupOpen(true);
            } catch (err) {
            setPopupBackgroundColor("red");
            setPopupHeader(`Failed to delete product.`);
            setPopupContent(`${err}`);
            setPopupShowCloseButton(true);
            setIsPopupOpen(true);
            console.error('Failed to delete product:', err);
        }
    };

    return (
        <main className="flex flex-grow pt-18">
            <div className="flex flex-grow">
                <Sidebar onSortChange={handleSortChange} onFilterChange={handleFilterChange} sortOption={sortOption} filters={filters} />
                <div className="flex-grow p-4 container mx-auto mt-12 flex flex-col items-center">
                    <div className="text-center mt-4">
                        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
                            Products Management
                        </div>
                    </div>
                    <div className="mb-4 mt-8">
                        <button
                            className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                            onClick={() => handleAddProduct()}
                        >
                            Add new product
                        </button>
                    </div>
                    <ul className="mt-8 w-full max-w-3xl">
                        {products.length === 0 ? (
                            <div className="flex-grow p-6 w-full py-10">
                                <div className="col-span-full flex text-center items-center justify-center text-white bg-neutral-800 text-xl font-medium py-20 rounded-md">
                                    No products matching given criteria.
                                </div>
                            </div>
                        ) : (
                            products.map((product) => (
                                <li key={product._id} className="flex justify-between items-center mb-4 w-full p-2 bg-white border rounded">
                                    <div className="flex flex-col w-2/5">
                                        <span className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</span>
                                        <span>{product.category?.name}</span>
                                    </div>
                                    <div className="flex flex-col w-1/5">
                                        <span className="font-semibold">Price: ${parseFloat(product.price).toFixed(2)}</span>
                                        <span>Stock: {product.stock}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="px-4 w-20 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                                            onClick={() => handleViewProduct(product._id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                            onClick={() => handleEditProduct(product._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                                            onClick={() => handleDeleteProduct(product)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
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
            <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            onDelete={handleDelete} 
            item={productToDelete}
            titleItem="product"
            itemLabel={productToDelete?.name}
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
  
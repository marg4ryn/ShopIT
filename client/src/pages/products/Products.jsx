import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct, fetchFilteredProducts } from '../../api/products';
import Sidebar from "../../components/Sidebar";
import BackButton from '../../components/BackButton';
import DeleteModal from '../../components/DeleteModal'
import Popup from "../../components/Popup";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupBackgroundColor, setPopupBackgroundColor] = useState('');
    const [popupHeader, setPopupHeader] = useState('');
    const [popupContent, setPopupContent] = useState('');
    const [popupShowCloseButton, setPopupShowCloseButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
          try {
            const data = await fetchProducts();
            setProducts(data);
          } catch (err) {
            console.error('Failed to fetch products:', err);
          }
        };
      
        loadProducts();
      }, []
    );

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleAddProduct = () => {
        navigate(`/addproduct`);
    };

    const handleViewProduct = (id) => {
        navigate(`/viewproduct/${id}`);
    };

    const handleEditProduct = (id) => {
        navigate(`/editproduct/${id}`);
    };

    const handleDeleteProduct = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
      };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
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
                <Sidebar />
                <div className="flex-grow p-4 container mx-auto mt-12 flex flex-col items-center">
                    <div className="text-center mt-4">
                        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
                            Products Management
                        </div>
                    </div>
                    <div className="mb-4 mt-8">
                        <button className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                            onClick={() => handleAddProduct()}
                        >
                            Add new product
                        </button>
                    </div>
                    <ul className="mt-8">
                        {products.map((product) => (
                        <li key={product._id} className="flex justify-between items-center mb-4 w-150 p-2 bg-white border rounded">
                            <div className="flex flex-col w-35">
                                <span className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</span>
                                <span>{product.category?.name}</span>
                            </div>
                            <div className="flex flex-col ml-auto mx-16 w-25">
                                <span className="font-semibold">Price: ${product.price}</span>
                                <span>Stock: {product.stock}</span>
                            </div>
                            <div>
                                <button className="mr-2 px-4 w-20 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                                    onClick={() => handleViewProduct(product._id)}>
                                    View
                                </button>
                                <button className="mr-2 px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                    onClick={() => handleEditProduct(product._id)}>
                                    Edit
                                </button>
                                <button className="mr-2 px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                                onClick={() => handleDeleteProduct(product)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                        ))}
                    </ul>
                    <BackButton />
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
  
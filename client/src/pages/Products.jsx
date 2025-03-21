import React, { useEffect, useState } from 'react';
import { fetchProducts, addProduct, editProduct, deleteProduct, fetchFilteredProducts } from '../api/products';
import Sidebar from "../components/Sidebar";

export default function Products() {
    const [products, setProducts] = useState([]);

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
      }, []);

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    };

    return (
        <main className="flex-grow pt-18">
            <div className="flex">
                <Sidebar />
                <div className="flex-grow p-6 container mx-auto mt-4 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4 text-white">Products management</h2>
                    <div className="mb-4 mt-8">
                        <button className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded">
                        Add new product
                        </button>
                    </div>
                    <ul className="mt-8">
                        {products.map((product) => (
                        <li key={product._id} className="flex justify-between items-center mb-4 w-150 p-2 bg-white border rounded">
                            <div className="flex flex-col">
                                <span className="font-semibold">{product.name}</span>
                                <span>{product.category?.name}</span>
                            </div>
                            <div>
                                <button className="mr-2 px-4 w-20 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                                    View
                                </button>
                                <button className="mr-2 px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                                    Edit
                                </button>
                                <button className="mr-2 px-4 w-20 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                                    Delete
                                </button>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>    
    );
}
  
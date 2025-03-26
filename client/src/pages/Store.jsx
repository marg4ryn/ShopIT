import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from '../api/products';
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";

export default function Store() {
    const [products, setProducts] = useState([]);
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
    }, []);

    const handleViewProduct = (id) => {
        navigate(`/viewproduct/${id}`);
    };

    return (
    <main className="flex-grow pt-18">
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6 container mx-auto py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.reduce((acc, product, index) => {
                const columns = 4;
                const itemsPerSection = 3 * columns;

                if (index % itemsPerSection === 0 ) {
                    acc.push(
                    <div key={`hero-${index}`} className="col-span-full">
                        <HeroSection />
                    </div>
                    );
                }

                acc.push(
                    <div key={product._id} className="bg-white p-4 rounded-lg text-center min-w-[320px]">
                        <img
                            src={product.imageUrl.startsWith("http") ? product.imageUrl : `http://localhost:3000/${product.imageUrl}`}
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-700">${product.price}</p>
                        <button
                            className="mt-4 mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => handleViewProduct(product._id)}
                        >
                            View product
                        </button>
                        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            Add to cart
                        </button>
                    </div>
                );

                return acc;
                }, [])}
            </div>
            </div>
        </div>
    </main>
    );
}

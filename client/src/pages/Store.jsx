import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from '../api/products';
import Sidebar from "../components/Sidebar";
import AdsList from "../components/AdsList";

export default function Store() {
    const [products, setProducts] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);
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
    <main className="flex-grow flex pt-18">
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6 container mx-auto py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.reduce((acc, product, index) => {
                    const columns = 4;
                    const itemsPerSection = 3 * columns;

                    if (index % itemsPerSection === 0) {
                        acc.push(
                            <div key={`hero-${index}`} className="col-span-full">
                                <AdsList />
                            </div>
                        );
                    }

                    acc.push(
                        <div
                            key={product._id}
                            className="relative bg-white p-4 rounded-lg text-center min-w-[280px] max-w-[400px] max-h-[360px] overflow-hidden group z-10"

                            onMouseEnter={() => setHoveredProduct(product._id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                            onClick={() => handleViewProduct(product._id)}
                            >
                            <img
                                src={`http://localhost:3000${product.imageUrl}`}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-green-600 text-lg font-semibold">${product.price}</p>


                            <div
                                className={`absolute top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center p-6 text-black transition-all duration-300 ease-in-out 
                                ${hoveredProduct === product._id ? "translate-x-0" : "-translate-x-full"}`}
                            >
                                <p className="text-lg font-bold">Details</p>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    );

                    return acc;
                }, [])}
            </div>
        </div>
    </main>
    );
}

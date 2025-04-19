import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFilteredProducts } from '../api/products';
import Sidebar from "../components/Sidebar";
import AdsList from "../components/AdsList";

export default function Store({ searchTerm }) {
    const [products, setProducts] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [sortOption, setSortOption] = useState("Most popular");
    const [filters, setFilters] = useState({
        selectedCategories: [],
        priceFrom: 0,
        priceTo: 999999,
    });

    const navigate = useNavigate();

    const handleViewProduct = (id) => {
        navigate(`/viewproduct/${id}`);
    };

    const loadFilteredProducts = async () => {
        try {
            const data = await fetchFilteredProducts({
                category: filters.selectedCategories.join(','),
                minPrice: filters.priceFrom,
                maxPrice: filters.priceTo,
                sortOption,
                search: searchTerm
            });
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch filtered products:", err);
        }
    };

    useEffect(() => {
        loadFilteredProducts();
    }, [filters, sortOption, searchTerm]);

    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const splitTextInTwo = (text) => {
        const limit = 30;
        
        if (text.length <= 20) {
            return { leftPart: text, rightPart: '' };
        }
        const midPoint = Math.floor(text.length / 2);
        let leftPart = text.substring(0, midPoint);
        let rightPart = text.substring(midPoint, limit);
        const lastSpaceIndex = rightPart.indexOf(' ') + leftPart.length;

        if (lastSpaceIndex !== -1) {
            leftPart = text.substring(0, lastSpaceIndex);
            rightPart = text.substring(lastSpaceIndex + 1, limit);
        }
        
        if (text.length > limit) {
            rightPart += '...';
        }
        
        return { leftPart, rightPart };
    };

    return (
    <main className="flex-grow flex pt-18">
        <div className="flex transition-all duration-300">
            <Sidebar onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
            {products.length === 0 ? (
                <div className="flex-grow p-6 w-full mr-14 py-10">
                    <div className="col-span-full">
                        <AdsList />
                    </div>
                    <div className="col-span-full flex text-center items-center justify-center text-white bg-neutral-800 text-xl font-medium py-20 rounded-md">
                        No products matching given criteria.
                    </div>
                </div>
            ) : (
            <div className="flex-grow p-6 w-full mr-14 py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.length === 0 ? (
                    <div>
                        <div className="col-span-full">
                            <AdsList />
                        </div>
                        <div className="col-span-full flex text-center items-center justify-center text-white bg-neutral-800 text-xl font-medium py-20 rounded-md">
                            No products matching given criteria.
                        </div>
                    </div>
                ) : (
                    products.reduce((acc, product, index) => {
                        const { leftPart, rightPart } = splitTextInTwo(product.name);
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
                                className="relative bg-white p-4 rounded-lg text-center min-w-[180px] max-w-[400px] max-h-[440px] overflow-hidden group z-10"
                                onMouseEnter={() => setHoveredProduct(product._id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                                onClick={() => handleViewProduct(product._id)}
                            >
                                <img
                                    src={`http://localhost:3000${product.imageUrl}`}
                                    alt={product.name}
                                    className="w-full h-80 object-contain rounded-md mb-4"
                                />
                                <h3 className="text-lg font-semibold">
                                    {product.name.length > 20
                                        ? `${product.name.substring(0, 20)}...`
                                        : product.name}
                                </h3>
                                <p className="text-green-600 text-lg font-semibold">
                                    ${parseFloat(product.price).toFixed(2)}
                                </p>

                                <div
                                    className={`absolute top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center p-6 text-black transition-all duration-300 ease-in-out 
                                    ${hoveredProduct === product._id ? "translate-x-0" : "-translate-x-full"}`}
                                >
                                    <p className="text-lg font-bold pb-2">
                                        <span>{leftPart}</span>
                                        <br />
                                        <span>{rightPart}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 pb-2">
                                        {product.description.length > 150
                                            ? `${product.description.substring(0, 150)}...`
                                            : product.description}
                                    </p>
                                    <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        );

                        return acc;
                    }, [])
                )}
            </div>)}
        </div>
    </main>
    );
}

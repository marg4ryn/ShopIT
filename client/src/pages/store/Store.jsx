import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { getFilteredProducts } from '../../api/products';
import { useSearchTerm } from '../../context/SearchContext';
import { useFilterContext } from '../../context/FilterContext'; 
import Sidebar from "../../components/Sidebar";
import AdCarousel from "../../components/AdCarousel";
import AddToCartModal from '../../components/modals/AddToCartModal';
import Popup from "../../components/modals/Popup";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Store() {
    const appUrl = import.meta.env.VITE_APP_URL;
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [lastHoveredProductId, setLastHoveredProductId] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupBackgroundColor, setPopupBackgroundColor] = useState('');
    const [popupHeader, setPopupHeader] = useState('');
    const [popupContent, setPopupContent] = useState('');
    const [popupShowCloseButton, setPopupShowCloseButton] = useState(false);   
    const { sortOption, filters, updateSortOption, updateFilters } = useFilterContext();
    const { searchTerm } = useSearchTerm();
    const { t } = useTranslation();
    const page = useRef(1);
    const limit = 12;
		const scrollTriggerRef = useRef(null);
    const navigate = useNavigate();

    const handleViewProduct = (id) => {
        navigate(`/view-product/${id}`);
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
    
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleHoverProduct = (product) => {
        setHoveredProductId(product._id);
        setLastHoveredProductId(product._id);
    }

    const addToCart = (productId, quantity) => {
        setIsPopupOpen(false);
        try {
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          const index = cart.findIndex(item => item.id === productId);

          if (index !== -1) {
            cart[index].quantity += quantity;
          } else {
            cart.push({ id: productId, quantity });
          }
        
          localStorage.setItem('cart', JSON.stringify(cart));

          setPopupBackgroundColor("#008236");
          setPopupHeader(t('status.success'));
          setPopupContent(t('product.addToCart.success'));
          setPopupShowCloseButton(false);
          setIsPopupOpen(true);
        } catch (err) {
          setPopupBackgroundColor("red");
          setPopupHeader(t('product.addToCart.failed'));
          setPopupContent(`${err}`);
          setPopupShowCloseButton(true);
          setIsPopupOpen(true);
          console.error(t('error.product.addToCart'), err);
        }
      };

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
					page.current = 1;
					setProducts(result.products);
				} else {
					page.current++;
					setProducts(prev => [...prev, ...result.products]);
				}        
		
				setHasMore(result.hasMore);
			} catch (err) {
					console.error(t('error.product.fetchProducts'), err);
			} finally {
				setLoading(false);
      }
    };

		useEffect(() => {
			if (!scrollTriggerRef.current) return;

			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						handleLoadMore();
					}
				},
				{
					root: null,
					rootMargin: '100px',
					threshold: 1.0,
				}
			);

			observer.observe(scrollTriggerRef.current);

			return () => {
				if (scrollTriggerRef.current) {
					observer.unobserve(scrollTriggerRef.current);
				}
				observer.disconnect();
			};
		}, [products.length, hasMore]);
 
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
		{loading ? <div className="flex justify-center items-center w-full max-w-full"><LoadingSpinner /> </div>: (
        <div className="flex w-full max-w-full">
            <Sidebar onSortChange={handleSortChange} onFilterChange={handleFilterChange} sortOption={sortOption} filters={filters} />
            {products.length === 0 ? (
                <div className="flex-grow items-center justify-center p-6 w-full mr-14 py-10">
                    <div className="col-span-full">
                        <AdCarousel />
                    </div>
                    <div className="col-span-full flex text-center items-center justify-center text-white bg-neutral-800 text-xl font-medium py-20 rounded-md">
                        {t('others.noResults')}
                    </div>
                </div>
            ) : (
            <div className="flex-grow p-6 mr-14 py-10 min-h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.reduce((acc, product, index) => {
                    const { leftPart, rightPart } = splitTextInTwo(product.name);
                    const columns = 4;
                    const itemsPerSection = 3 * columns;

                    if (index % itemsPerSection === 0) {
                        acc.push(
                            <div key={`hero-${index}`} className="col-span-full">
                                <AdCarousel />
                            </div>
                        );
                    }

                    acc.push(
                        <div
                            key={product._id}
                            className="relative bg-white p-4 rounded-lg text-center min-w-[180px] max-w-[400px] max-h-[440px] overflow-hidden group z-10"
                            onMouseEnter={() => handleHoverProduct(product)}
                            onMouseLeave={() => setHoveredProductId(null)}
                            onClick={() => handleViewProduct(product._id)}
                        >
                            <img
                                src={`${appUrl}${product.imageUrls[0]}`}
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
                                ${hoveredProductId === product._id ? "translate-x-0" : "-translate-x-full"}`}
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
                                <button 
                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsModalOpen(true);
                                      }}
                                >
                                    {t('button.addToCart')}
                                </button>
                            </div>
                        </div>
                    );

                    return acc;
                }, [])}
            {hasMore && (
                <div className="col-span-full flex justify-center py-6">
					<span className="text-white">{t('others.loading')}</span>
				    <div ref={scrollTriggerRef} className="h-1 col-span-full" />
                </div>
            )}
            </div>)}
        </div>
			)}
        <AddToCartModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={addToCart}
          productId={lastHoveredProductId}
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

import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getProduct } from "../../api/products";
import { useUser } from '../../context/UserContext';
import BackButton from '../../components/BackButton';
import Popup from "../../components/modals/Popup";
import AddToCartModal from '../../components/modals/AddToCartModal';

export default function ViewProduct() {
  const { roles } = useUser();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupBackgroundColor, setPopupBackgroundColor] = useState('');
  const [popupHeader, setPopupHeader] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [popupShowCloseButton, setPopupShowCloseButton] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
        setSelectedImage(data.imageUrls?.[0] || "/images/No_Image_Available.jpg");
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    loadProduct();
  }, [id]);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const nextImage = () => {
    const currentIndex = product.imageUrls.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % product.imageUrls.length;
    setSelectedImage(product.imageUrls[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = product.imageUrls.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + product.imageUrls.length) % product.imageUrls.length;
    setSelectedImage(product.imageUrls[prevIndex]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const addToCart = (quantity) => {
    setIsPopupOpen(false);
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      const index = cart.findIndex(item => item.id === id);
      if (index !== -1) {
        cart[index].quantity += quantity;
      } else {
        cart.push({ id, quantity });
      }
      console.log(cart);
    
      localStorage.setItem('cart', JSON.stringify(cart));
      setPopupBackgroundColor("#008236");
      setPopupHeader("Success!");
      setPopupContent("Product has been added to your cart!");
      setPopupShowCloseButton(false);
      setIsPopupOpen(true);
    } catch (err) {
      setPopupBackgroundColor("red");
      setPopupHeader(`Failed to add product to cart.`);
      setPopupContent(`${err}`);
      setPopupShowCloseButton(true);
      setIsPopupOpen(true);
      console.error('Failed to add product to cart:', err);
    }
  };

  return (
    <main className="flex flex-col flex-grow">
      {!product ? (
        <p className="text-white text-center">Loading product...</p>
      ) : (
        <div className="flex flex-col space-y-6 place-items-center">
          <div className="text-center pt-10 mt-26">
            <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
              {product.name}
            </div>
          </div>

          <div className="bg-neutral-800 p-6 rounded-md shadow-md mx-6 w-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
              <div className="flex justify-center px-4 bg-white rounded-xl border-0 relative">
                  <img
                    src={`http://localhost:3000${selectedImage}`}
                    alt={product.name}
                    className="h-128 object-contain"
                  />
                  {product.imageUrls?.length > 1 && (
                    <>
                      <div
                        onClick={prevImage}
                        className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer hover:bg-[rgba(255,255,255,0.5)] transition-all duration-400 flex items-center justify-center group rounded-l-lg"
                      >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-gray-600 text-2xl"><FaChevronLeft /></span>
                        </div>
                      </div>

                      <div
                        onClick={nextImage}
                        className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer hover:bg-[rgba(255,255,255,0.5)] transition-all duration-400 flex items-center justify-center group rounded-r-lg"
                      >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-gray-600 text-2xl"><FaChevronRight /></span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-2 justify-center mt-4">
                  {product.imageUrls?.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000${img}`}
                      alt={`Mini ${index}`}
                      className={`w-16 h-16 object-contain rounded cursor-pointer border-4 bg-white
                        ${selectedImage === img ? 'border-blue-600' : 'border-gray-300'}`}                      
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-md border-0 flex flex-col h-full">
                <div className="text-white mx-auto pr-4 container py-10 space-y-5 flex flex-col items-center flex-grow">
                  <div className="flex justify-between w-full">
                    <span className="text-sm">{product.category?.name || "Unknown"}</span>
                    <span
                      className={`text-sm ${product.stock < 20 ? 'text-red-500 font-bold' : ''}`}
                    >
                      {product.stock < 20 ? `Only ${product.stock} products left!` : `In stock: ${product.stock}`}
                    </span>
                  </div>

                  <div className="flex-grow w-full">
                    <span className="text-lg">{product.description}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center w-full mt-auto pb-4">
                  <span className="text-green-600 text-3xl font-bold">${parseFloat(product.price).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex text-center gap-8 items-center justify-center my-4">
            <BackButton onClick={() => { navigate(-1); }} />
            <button 
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded w-40"
              onClick={() => {setIsModalOpen(true);}}
            >
              Add to cart
            </button>
            {roles.includes("admin") && (
            <button
              className="px-4 w-20 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={() => navigate(`/edit-product/${id}`)}
            >
              Edit
            </button>
            )}
          </div>
        </div>
      )}
       <AddToCartModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={addToCart}
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

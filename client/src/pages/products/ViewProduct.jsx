import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../api/products";
import BackButton from '../../components/BackButton';

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

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
                <div className="flex justify-center px-4 bg-white rounded-xl border-0">
                  <img
                    src={`http://localhost:3000${selectedImage}`}
                    alt={product.name}
                    className="h-128 object-contain"
                  />
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
            <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded w-40">
              Add to cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

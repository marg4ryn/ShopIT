import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct  } from "../../api/products";
import BackButton from '../../components/BackButton';

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct (id);
        setProduct(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    loadProduct();
  }, [id]);

  return (
    <main className="container mx-auto py-10 flex-grow pt-18">
      {!product ? (
        <p className="text-white text-center">Loading product...</p>
      ) : (
        <div className="flex flex-col space-y-6 place-items-center">
          <div className="text-center mt-4">
            <p className="text-2xl font-bold mb-4 mt-4 text-white">{product.name}</p>
          </div>
  
          <div className="bg-neutral-800 p-6 rounded-md shadow-md mx-6 w-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-md border-0 ">
                <div className="flex justify-center">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl.startsWith("http") ? product.imageUrl : `http://localhost:3000${product.imageUrl}`}
                      alt={product.name}
                      className="w-128 h-64 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
  
              <div className="rounded-md border-0 flex flex-col h-full">                
                <div className="text-white mx-auto pr-4 container py-10 space-y-5 flex flex-col items-center flex-grow">
                  
                  <div className="flex justify-between w-full">
                    <span className="text-sm">{product.category?.name || "Unknown"}</span>
                    <span className="text-sm font-bold">Only {product.stock} products left!</span>
                  </div>     

                  <div className="flex-grow w-full">
                    <label className="block">Description</label>
                    <span className="text-lg">{product.description}</span>
                  </div>
                </div>                  

                <div className="flex items-center justify-center w-full mt-auto pb-4">
                  <span className="text-green-600 text-3xl font-bold">${product.price}</span>
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex text-center gap-8 items-center justify-center mt-4">
            <BackButton />
            <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded w-40">
              Add to cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

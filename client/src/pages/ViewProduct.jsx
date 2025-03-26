import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct  } from "../api/products";

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct (id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (!product) {
    return <p className="text-white text-center">Product not found.</p>;
  }

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen">
        <div className="h-1/3 flex items-center justify-center text-center mb-18">
            <p className="text-3xl font-bold text-white">{product.name}</p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex justify-center">
            {product.imageUrl && (
                <img
                src={product.imageUrl.startsWith("http") ? product.imageUrl : `http://localhost:3000/${product.imageUrl}`}
                alt={product.name}
                className="w-128 h-64 object-cover rounded-md"
                />
            )}
            </div>

            <div className="text-center p-4">
            <h2 className="text-xl font-bold text-white mb-2">Description</h2>
            <p className="text-white text-lg">{product.description}</p>
            </div>

            <div className="flex flex-col space-y-4 p-6">
            <div className="flex justify-between bg-gray-800 text-white p-2 rounded-md">
                <span className="font-bold">Price:</span> <span>${product.price}</span>
            </div>
            <div className="flex justify-between bg-gray-800 text-white p-2 rounded-md">
                <span className="font-bold">Stock:</span> <span>{product.stock}</span>
            </div>
            <div className="flex justify-between bg-gray-800 text-white p-2 rounded-md">
                <span className="font-bold">Category:</span> <span>{product.category?.name || "Unknown"}</span>
            </div>
            </div>
        </div>
    </main>
  );
}

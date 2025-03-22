import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api/categories";
import { addProduct } from "../api/products";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = '';
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      try {
        const uploadResponse = await axios.post('http://localhost:3000/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        uploadedImageUrl = uploadResponse.data.imageUrl;
        setImageUrl(uploadedImageUrl);
      } catch (error) {
        alert('Failed to upload image');
        return;
      }
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category: selectedCategory,
      imageUrl,
    };

    try {
      const response = await addProduct(productData);
      alert("Product added successfully!");
      console.log(response);
    } catch (error) {
      alert("There was an error while adding the product.");
    }
  };

  return (
    <main className="container mx-auto py-10 flex-grow pt-18">
        <div className="flex flex-col space-y-6">
            <div className="text-center mt-4">
                <p className="text-2xl font-bold mb-4 mt-4 text-white">Add new product</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-md border-0">
    
                        {imageUrl && (
                        <div className="mb-4">
                            <img
                                src={imageUrl}
                                alt="Selected Preview"
                                className="w-32 h-32 object-cover rounded-md"
                            />
                        </div>)}
                        <div className="flex items-center space-x-4 w-full">
                            <label className="text-white font-lg font-bold pb-2">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="border text-black border-gray-300 bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div className="flex-grow container mx-auto py-10">
                            <label className="block text-white font-lg font-bold pb-2">
                            Description
                            </label>
                            <textarea
                            className="w-150 border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            rows="4"
                            placeholder="Enter product description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="p-4 rounded-md border-0 w-100">
                        <div className="p-6 container mx-auto py-10 space-y-5 flex flex-col items-center">
                            <div className="flex items-center justify-end space-x-4 w-full">
                            <label className="text-white font-lg font-bold">Name</label>
                            <input
                                type="text"
                                className="border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            </div>

                            <div className="flex items-center justify-end space-x-4 w-full">
                            <label className="text-white font-lg font-bold">Price ($)</label>
                            <input
                                type="number"
                                className="border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            </div>

                            <div className="flex items-center justify-end space-x-4 w-full">
                            <label className="text-white font-lg font-bold">Stock</label>
                            <input
                                type="number"
                                className="border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                            </div>

                            <div className="flex items-center justify-end space-x-4 w-full">
                                <label className="text-white font-lg font-bold">Category</label>
                                <select
                                    className="w-52 border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">-- Select --</option>
                                    {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                    ))}
                                </select>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="mt-4 p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                                    >
                                    Add new product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </main>
  );
}

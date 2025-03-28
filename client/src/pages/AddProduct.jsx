import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api/categories";
import { addProduct } from '../api/products';
import BackButton from '../components/BackButton';

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("http://localhost:3000/images/No_Image_Available.jpg");

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImageUrl("/images/No_Image_Available.png");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !price || !stock || !selectedCategory) {
      alert("All fields are required");
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    formData.append('stock', parseInt(stock));
    formData.append('category', selectedCategory);
  
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await addProduct(formData);
      alert("Product added successfully!");
      console.log(response);
    } catch (error) {
      alert("There was an error while adding the product.");
      console.error(error);
    }
  };

  return (
    <main className="container mx-auto py-10 flex-grow pt-18">
      <div className="flex flex-col space-y-6 place-items-center">
        <div className="text-center mt-4">
            <p className="text-2xl font-bold mb-4 mt-4 text-white">Add new product</p>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="bg-neutral-800 p-6 rounded-md shadow-md mx-6 w-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-md border-0 ">
                <div className="p-4 rounded-md border-0 flex flex-col items-center justify-center">

                  <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt="Selected Preview"
                        className="w-48 h-48 object-cover rounded-md"
                    />
                  </div>

                  <div className="flex items-center space-x-4 w-full justify-center">
                      <label className="text-white font-lg font-bold pb-2">Image</label>
                      <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            id="file-input"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                            type="button"
                            className="border text-black border-gray-300 bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          Choose File
                        </button>
                      </div>
                  </div>
              </div>

              <div className="flex-grow container mx-auto mt-4">
                  <label className="block text-white font-lg font-bold pb-2">
                    Description
                  </label>
                  <textarea
                    className="w-180 border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    rows="4"
                    placeholder="Enter product description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
              </div>
          </div>

            <div className="rounded-md border-0">
              <div className="mx-auto pr-4 container py-10 space-y-5 flex flex-col items-center">
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
                    className="w-50 border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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

              </div>
            </div>
          </div>
          </div>               
           <div className="flex text-center gap-8 items-center justify-center mt-4">
           <BackButton />
            <button
              type="submit"
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded w-40"
              >
              Add
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../api/categories";
import { addProduct } from '../../api/products';
import BackButton from '../../components/BackButton';

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("http://localhost:3000/images/No_Image_Available.jpg");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const navigate = useNavigate();

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
      setImageUrl("http://localhost:3000/images/No_Image_Available.jpg");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!price) newErrors.price = "Price is required";
    if (!stock) newErrors.stock = "Stock is required";
    if (!selectedCategory) newErrors.category = "Category is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', parseInt(stock));
    formData.append('category', selectedCategory);
  
    if (image) {
      formData.append('image', image);
    }

    try {
      await addProduct(formData);
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "#008236",
        header: "Success!",
        content: "Product has been successfully created!",
        showCloseButton: false
      }));
    } catch (error) {
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "red",
        header: "Failed to create product.",
        content: `${error}` ,
        showCloseButton: true
      }));
      console.error(error);
    } finally {
        navigate(-1);
    }
  };

  return (
    <main className="flex flex-col flex-grow">
      <div className="text-center pt-10 mt-26">
        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
          Add Product
        </div>
      </div>

      <div className="flex flex-col items-center mt-10"> 
        <form onSubmit={handleSubmit}>
          <div className="bg-neutral-800 p-6 rounded-md shadow-md mx-6 w-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-md border-0 flex flex-col items-center justify-center">
                <div className="mb-4">
                  <img
                    src={imageUrl}
                    alt="Selected Preview"
                    className="h-66 object-contain rounded-md"
                  />
                </div>
                <div className="flex items-center space-x-4 w-full justify-center">
                  <label htmlFor="file-input" className="text-white font-lg font-bold pb-2">Image</label>
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

              <div className="p-4 rounded-md border-0 flex flex-col space-y-5 justify-center">
                <div className="flex flex-col">
                  <label htmlFor="productName" className="text-white font-lg font-bold pb-2">Name</label>
                  <input
                    id="productName"
                    type="text"
                    className={`w-full border text-black ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ ...errors, name: "" });
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="productPrice" className="text-white font-lg font-bold pb-2">Price ($)</label>
                  <input
                    id="productPrice"
                    type="number"
                    className={`w-full border text-black ${errors.price ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setErrors({ ...errors, price: "" });
                    }}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="productStock" className="text-white font-lg font-bold pb-2">Stock</label>
                  <input
                    id="productStock"
                    type="number"
                    className={`w-full border text-black ${errors.stock ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                      setErrors({ ...errors, stock: "" });
                    }}
                  />
                  {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="productCategory" className="text-white font-lg font-bold pb-2">Category</label>
                  <select
                    id="productCategory"
                    className={`w-full border text-black ${errors.category ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setErrors({ ...errors, category: "" });
                    }}
                  >
                    <option value="">-- Select --</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>   
                  {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="productDescription" className="block text-white font-lg font-bold pb-2">
                Description
              </label>
              <textarea
                id="productDescription"
                className={`w-full border text-black ${errors.description ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                rows="4"
                placeholder="Enter product description..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: "" });
                }}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
          </div>
              
           <div className="flex text-center gap-8 items-center justify-center my-4">
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

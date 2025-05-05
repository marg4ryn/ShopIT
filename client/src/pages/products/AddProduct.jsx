import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/categories";
import { addProduct } from '../../api/products';
import BackButton from '../../components/BackButton';
import UnsavedChangesModal from '../../components/modals/UnsavedChangesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";

export default function AddProduct() {
  const { getAccessTokenSilently } = useAuth0();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("http://localhost:3000/images/No_Image_Available.jpg");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
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
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    loadCategories();
  }, []);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const previewUrl = URL.createObjectURL(file);
  
    const newImage = { file, previewUrl };
    setImages(prev => [...prev, newImage]);
    setSelectedImageUrl(previewUrl);
    setUnsavedChanges(true);
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
  
    images.forEach((imgObj) => {
      if (imgObj.file) {
        formData.append('images', imgObj.file);
      }
    });
  
    const existingUrls = images
      .filter(img => img.url)
      .map(img => img.url);
  
    formData.append('imageUrls', JSON.stringify(existingUrls));
  
    try {
      const token = await getAccessTokenSilently();
      await addProduct(token, formData);
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "#008236",
        header: "Success!",
        content: "Product has been successfully created!",
        showCloseButton: false
      }));
      setUnsavedChanges(false);
    } catch (error) {
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "red",
        header: "Failed to create product.",
        content: `${error}`,
        showCloseButton: true
      }));
      console.error(error);
    } finally {
      navigate(-1);
    }
  };

  const handleLeave = () => {
    setIsModalOpen(false);
    setUnsavedChanges(false);
    navigate(-1);
  };
  
  const handleStay = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSelectedImage = () => {
    setImages(prev => prev.filter(img => {
      const url = img.previewUrl || img.url;
      return url !== selectedImageUrl;
    }));
    setSelectedImageUrl("http://localhost:3000/images/No_Image_Available.jpg");
    setUnsavedChanges(true);
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
              <span className="text-white font-lg font-bold pb-2">Image</span>
              <div className="mb-4 relative w-full max-w-md mx-auto">
                <img
                  src={selectedImageUrl}
                  id="file-preview"
                  alt="Selected Preview"
                  className="h-64 w-full object-contain rounded-md"
                />

                {images.length > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteSelectedImage}
                  className="absolute bottom-2 right-2 w-10 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
                  title="Delete image"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                </button>)}
              </div>

                <div className="flex justify-center gap-2 mb-4">
                  {images.map((imgObj, index) => (
                    <div
                      key={index}
                      className={`relative w-16 h-16 border-4 rounded overflow-hidden bg-white cursor-pointer transition 
                        ${selectedImageUrl === imgObj.previewUrl ? 'border-blue-600' : 'border-gray-300'}
                        hover:shadow-md hover:ring-2 hover:ring-blue-600`}
                    >
                      <img
                        src={imgObj.previewUrl}
                        alt={`Thumb ${index}`}
                        className="w-full h-full object-cover"
                        onClick={() => setSelectedImageUrl(imgObj.previewUrl)}
                      />
                    </div>
                  ))}

                  {images.length < 5 && (
                    <div className="relative w-16 h-16 border-2 border-gray-400 rounded flex items-center justify-center overflow-hidden bg-white hover:shadow-md hover:ring-2 hover:ring-blue-600">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleAddImage(e);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span className="text-2xl text-gray-500 font-bold pointer-events-none">+</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-md border-0 flex flex-col space-y-5 justify-center">
                <div className="flex flex-col">
                  <label htmlFor="productName" className="text-white font-lg font-bold pb-2">Name</label>
                  <input
                    id="productName"
                    type="text"
                    maxLength={50}
                    className={`w-full border text-black ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ ...errors, name: "" });
                      setUnsavedChanges(true);
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
                    max={999999}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setErrors({ ...errors, price: "" });
                      setUnsavedChanges(true);
                    }}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="productStock" className="text-white font-lg font-bold pb-2">Stock</label>
                  <input
                    id="productStock"
                    type="number"
                    max={999999}
                    className={`w-full border text-black ${errors.stock ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                      setErrors({ ...errors, stock: "" });
                      setUnsavedChanges(true);
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
                      setUnsavedChanges(true);
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
                maxLength={400}
                className={`w-full border text-black ${errors.description ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                rows="4"
                placeholder="Enter product description..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: "" });
                  setUnsavedChanges(true);
                }}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
          </div>
              
           <div className="flex text-center gap-8 items-center justify-center my-4">
           <BackButton onClick={() => {
              if (unsavedChanges) {
                setIsModalOpen(true);
              } else {
                navigate(-1);
              }
            }} />
            <button
              type="submit"
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded w-40"
              >
              Add
            </button>
          </div>
        </form>
      </div>
      <UnsavedChangesModal 
        isOpen={isModalOpen} 
        onClose={handleStay} 
        onExit={handleLeave} 
      />
    </main>
  );
}

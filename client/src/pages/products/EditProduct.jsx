import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, editProduct } from "../../api/products";
import { getAllCategories } from "../../api/categories";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";
import BackButton from '../../components/BackButton';
import UnsavedChangesModal from '../../components/modals/UnsavedChangesModal';
import LoadingSpinner from "../../components/LoadingSpinner";

export default function EditProduct() {
  const noImageUrl = import.meta.env.VITE_NO_IMAGE_URL;
  const appUrl = import.meta.env.VITE_APP_URL;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(noImageUrl);
  const [initialData, setInitialData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrls: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  }); 
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isModified =
    name !== initialData.name ||
    description !== initialData.description ||
    price !== initialData.price ||
    stock !== initialData.stock ||
    category !== initialData.category ||
    visibleImages.length !== initialData.imageUrls.length ||
    visibleImages.some((img, idx) => img.url !== initialData.imageUrls[idx]);

  useEffect(() => {
    const filtered = images.filter((img) => !img.isDeleted);
    setVisibleImages(filtered);
  }, [images]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await getProduct(id);
  
        setName(product?.name);
        setDescription(product?.description);
        setPrice(product?.price);
        setStock(product?.stock);
        setCategory(product?.category?._id || "");
  
        const imageUrls = product.imageUrls? product.imageUrls : [];
        const fullImageUrls = imageUrls?.map(url => `${appUrl}${url}`);
        const imageObjects = fullImageUrls?.map(url => ({
          file: null,
          url,
          previewUrl: url,
          isDeleted: false
        }));
        
        setImages(imageObjects);
        setSelectedImageUrl(fullImageUrls?.[0] || noImageUrl);
  
        setInitialData({
          name: product?.name,
          description: product?.description,
          price: product?.price,
          stock: product?.stock,
          category: product?.category?._id || "",
          imageUrls: fullImageUrls,
        });
      } catch (err) {
        console.error(t('error.product.fetchProduct'), err);
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (err) {
        console.error(t('error.category.fetchCategories'), err);
      }
    };
  
    loadProduct();
    loadCategories();
  }, [id]);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const previewUrl = URL.createObjectURL(file);
  
    const newImage = {
      file,
      previewUrl,
      url: previewUrl,
      isDeleted: false,
    };
  
    setImages((prev) => [...prev, newImage]);
    setSelectedImageUrl(previewUrl);
    setUnsavedChanges(true);
  };

  const handleDeleteSelectedImage = () => {
    setImages((prev) => {
      const updated = prev.map((img) =>
        img.url === selectedImageUrl || img.previewUrl === selectedImageUrl
          ? { ...img, isDeleted: true }
          : img
      );
  
      const nextAvailable = updated.find((img) => !img.isDeleted);
      setSelectedImageUrl(
        nextAvailable ? (nextAvailable.url || nextAvailable.previewUrl) : noImageUrl
      );
  
      return updated;
    });
  
    setUnsavedChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!name) newErrors.name = t('form.error.nameRequired');
    if (!description) newErrors.description = t('form.error.descriptionRequired');
    if (!price) newErrors.price = t('form.error.priceRequired');
    if (!stock) newErrors.stock = t('form.error.stockRequired');
    if (!category) newErrors.category = t('form.error.categoryRequired');
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", parseInt(stock));
    formData.append("category", category);
  
    const deletedImages = [];
  
    images.forEach((imgObj) => {
      if (imgObj.isDeleted) {
        const imagePath = imgObj.url.replace(appUrl, "");
        deletedImages.push(imagePath);
      } else if (imgObj.file) {
        formData.append("images", imgObj.file);
      }
    });
  
    if (deletedImages.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedImages));
    }
  
    try {
      const token = await getAccessTokenSilently();
      await editProduct(token, id, formData, deletedImages);
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "#008236",
        header: t('status.success'),
        content: t('product.edit.success'),
        showCloseButton: false
      }));
      setUnsavedChanges(false);
    } catch (error) {
      sessionStorage.setItem("popupData", JSON.stringify({
        backgroundColor: "red",
        header: t('product.edit.failed'),
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

  return (
    <main className="flex flex-col flex-grow">
      {loading ? <LoadingSpinner /> : (
        <div className="flex flex-col space-y-6 place-items-center">
        <div className="text-center pt-10 mt-26">
          <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md">
            {t('header.editProduct')}
          </div>
        </div>

        <div className="flex flex-col items-center mt-10"> 
          <form onSubmit={handleSubmit}>
          <div className="bg-neutral-800 p-6 rounded-md shadow-md mx-6 w-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-md border-0 flex flex-col items-center justify-center">
                <span className="text-white font-lg font-bold pb-2">{t('form.image')}</span>
                <div className="mb-4 relative w-full max-w-md mx-auto">
                  <img
                    src={selectedImageUrl}
                    id="file-preview"
                    alt="Selected Preview"
                    className="h-64 w-full object-contain rounded-md"
                  />

                  {visibleImages.length > 0 && (
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
                    {visibleImages.map((imgObj, index) => (
                      <div
                        key={index}
                        className={`relative w-16 h-16 border-4 rounded overflow-hidden bg-white cursor-pointer transition 
                          ${selectedImageUrl === imgObj.url ? 'border-blue-600' : 'border-gray-300'}
                          hover:shadow-md hover:ring-2 hover:ring-blue-600`}
                      >
                        <img
                          src={imgObj.url}
                          alt={`Thumb ${index}`}
                          className="w-full h-full object-cover"
                          onClick={() => setSelectedImageUrl(imgObj.url)}
                        />
                      </div>
                    ))}

                    {visibleImages.length < 5 && (
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

              <div className="space-y-4">
                <div className="flex flex-col mt-4">
                  <label htmlFor="productName" className="text-white font-lg font-bold pb-2">{t('form.name')}</label>
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
                  <label htmlFor="productPrice" className="text-white font-lg font-bold pb-2">{t('form.price')}</label>
                  <input
                    id="productPrice"
                    type="number"
                    max={999999}
                    className={`w-full border text-black ${errors.price ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setErrors({ ...errors, price: "" });
                      setUnsavedChanges(true);
                    }}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="productStock" className="text-white font-lg font-bold pb-2">{t('form.stock')}</label>
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
                  <label htmlFor="productCategory" className="text-white font-lg font-bold pb-2">{t('form.category')}</label>
                  <select
                    id="productCategory"
                    className={`w-full border text-black ${errors.category ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setErrors({ ...errors, category: "" });
                      setUnsavedChanges(true);
                    }}
                  >
                  <option value="">{t('placeholder.select')}</option>
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
                {t('form.description')}
              </label>
              <textarea
                id="productDescription"
                maxLength={400}
                className={`w-full border text-black ${errors.description ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
                rows="4"
                placeholder={t('placeholder.description')}
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
              disabled={!isModified}
              type="submit"
              className={`p-2 rounded w-40 text-white transition-colors duration-200 ${
                isModified
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-500"
              }`}
              >
              {t('button.save')}
            </button>
          </div>
        </form>
      </div>
      </div>
    )}
      <UnsavedChangesModal 
        isOpen={isModalOpen} 
        onClose={handleStay} 
        onExit={handleLeave} 
      />
    </main>
  );
}

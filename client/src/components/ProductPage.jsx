import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

const ProductPage = () => {
  return (
    <div className="flex">

      <div className="flex-grow p-6"> 
        <h1 className="text-2xl font-bold mb-4">Lista produktów</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;

import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

const ProductPage = () => {
  return (
    <div className="flex">
    <Sidebar />
      <div className="flex-grow p-6"> 
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ViewProduct from "./pages/ViewProduct";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-neutral-900 flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import VerifyEmail from "./pages/login/VerifyEmail";
import Store from "./pages/store/Store";
import Cart from "./pages/cart/Cart";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import ViewProduct from "./pages/products/ViewProduct";
import EditProduct from "./pages/products/EditProduct";
import AddProduct from "./pages/products/AddProduct";
import Announcements from "./pages/announcements/Announcements";
import ViewAnnouncement from "./pages/announcements/ViewAnnouncement";
import EditAnnouncement from "./pages/announcements/EditAnnouncement";
import AddAnnouncement from "./pages/announcements/AddAnnouncement";

function App() {
  return (
    <BrowserRouter>    
      <FilterProvider>
      <SearchProvider>
        <div className="flex bg-neutral-900 flex-col min-h-screen">
          <Routes>
            <Route path="/login" element={<><Navbar /> <Login /></>} />\
            <Route path="/register" element={<><Navbar /> <Register /></>} />
            <Route path="/forgot-password" element={<><Navbar /> <ForgotPassword /></>} />
            <Route path="/reset-password" element={<><Navbar /> <ResetPassword /></>} />
            <Route path="/verify-email" element={<><Navbar /> <VerifyEmail /></>} />
            <Route path="/" element={<><Navbar /> <Store /></>} />
            <Route path="/cart" element={<><Navbar /> <Cart /></>} />
            <Route path="/categories" element={<><Navbar /> <Categories /></>} />
            <Route path="/products" element={<><Navbar /> <Products /></>} />
            <Route path="/view-product/:id" element={<><Navbar /> <ViewProduct /></>} />
            <Route path="/edit-product/:id" element={<><Navbar /> <EditProduct /></>} />
            <Route path="/add-product" element={<><Navbar /> <AddProduct /></>} />
            <Route path="/announcements" element={<><Navbar /> <Announcements /></>} />
            <Route path="/view-announcement/:id" element={<><Navbar /> <ViewAnnouncement /></>} />
            <Route path="/edit-announcement/:id" element={<><Navbar /> <EditAnnouncement /></>} />
            <Route path="/add-announcement" element={<><Navbar /> <AddAnnouncement /></>} />
          </Routes>
          <Footer />
        </div>    
      </SearchProvider>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;

/* TODO before next phase
- logging
- user roles
- user profile
*/

/* TODO
- shopping cart + cookies
- orders + api
*/

/* TODO at the end
- two language versions
- page loading animation
- application responsiveness
- application opening animation
- move application to MVP
- tests
*/

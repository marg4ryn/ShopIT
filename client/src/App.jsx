import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext";
import { UserProvider, useUser } from "./context/UserContext";
import { OrderProvider } from "./context/OrderContext";
import { Auth0Provider } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserProfile from "./pages/login/UserProfile";
import Store from "./pages/store/Store";
import Statute from "./pages/store/Statute";
import PrivacyPolicy from "./pages/store/PrivacyPolicy";
import Cart from "./pages/cart/Cart";
import Shipment from "./pages/cart/Shipment";
import Payment from "./pages/cart/Payment";
import Summary from "./pages/cart/Summary";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import ViewProduct from "./pages/products/ViewProduct";
import EditProduct from "./pages/products/EditProduct";
import AddProduct from "./pages/products/AddProduct";
import Announcements from "./pages/announcements/Announcements";
import ViewAnnouncement from "./pages/announcements/ViewAnnouncement";
import EditAnnouncement from "./pages/announcements/EditAnnouncement";
import AddAnnouncement from "./pages/announcements/AddAnnouncement";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

const AppContent = () => {
  const { isUserLoading } = useUser();

  if (isUserLoading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <OrderProvider>
      <FilterProvider>
      <SearchProvider>
        <div className="flex bg-neutral-900 flex-col min-h-screen">
          <Routes>
            <Route path="/user-profile" element={<><Navbar /> <UserProfile /></>} />
            <Route path="/" element={<><Navbar /> <Store /></>} />
            <Route path="/statute" element={<><Navbar /> <Statute /></>} />
            <Route path="/privacy-policy" element={<><Navbar /> <PrivacyPolicy /></>} />
            <Route path="/cart" element={<><Navbar /> <Cart /></>} />
            <Route path="/shipment" element={<><Navbar /> <Shipment /></>} />
            <Route path="/payment" element={<><Navbar /> <Payment /></>} />
            <Route path="/summary" element={<><Navbar /> <Summary /></>} />
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
      </OrderProvider>
    </BrowserRouter>
  );
};

function App() {
  return (
    <Auth0Provider 
      domain={domain}
      clientId={clientId}
      authorizationParams={{ 
        redirect_uri: window.location.origin,
        audience: audience, 
      }}
    >
    <UserProvider>
      <AppContent />
    </UserProvider>
    </Auth0Provider>
  );
}

export default App;

/* TODO
- graying out products without quantity
- automatically hide products without quantity

- order preview
- orders list for admin

- reviews
- reviews list for admin

- change cart layout

- move application to MVP
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext";
import { UserProvider } from "./context/UserContext";
import { Auth0Provider } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserProfile from "./pages/login/UserProfile";
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

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

function App() {
  return (
    <BrowserRouter>
      <Auth0Provider 
        domain={domain}
        clientId={clientId}
        authorizationParams={{ 
          redirect_uri: window.location.origin,
          audience: "https://shopit-api", 
        }}
      >
      <UserProvider>
      <FilterProvider>
      <SearchProvider>
        <div className="flex bg-neutral-900 flex-col min-h-screen">
          <Routes>
            <Route path="/user-profile" element={<><Navbar /> <UserProfile /></>} />
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
      </UserProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;

/* TODO before next phase
- authentication
- user profile
- server no role error handling
*/

/* TODO
- shopping cart + cookies
- orders + api
- product reviews 
*/

/* TODO at the end
- two language versions
- page loading animation
- application responsiveness
- application opening animation
- move application to MVP
- Mailchimp
- Twilio
- Google Analytics
- tests
*/

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
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
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <div className="flex bg-neutral-900 flex-col min-h-screen">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Store searchTerm={searchTerm} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products searchTerm={searchTerm} />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/viewannouncement/:id" element={<ViewAnnouncement />} />
          <Route path="/editannouncement/:id" element={<EditAnnouncement />} />
          <Route path="/addannouncement" element={<AddAnnouncement />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

/*TODO przed implementacją logowania
- funkcja zaznaczenia dla ogłoszeń
- AJAX do doczytywania
- możliwość dodawania wielu zdjęć dla produktu
- animacja ładowania
- you have unsaved changes
- animacja ładowania aplikacji
- no products found
- części ułamowe dla cen produktów
- ograniczenia dla długości tekstów
*/

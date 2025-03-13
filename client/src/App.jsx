import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-neutral-900 flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductPage from "./components/ProductPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        <ProductPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex bg-neutral-900 flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-18">
        <ProductPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;

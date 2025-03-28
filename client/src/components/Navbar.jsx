import { FaSearch, FaShoppingCart, FaUserAlt, FaListAlt, FaStore, FaBox, FaAd } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-green-700 text-white p-4 w-full fixed top-0 z-50">
      <div className="pl-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">ShopIt</h1>

        {location.pathname === "/" && (
          <div className="relative w-full max-w-[550px] ">
            <input 
              type="text" 
              placeholder="Search products ..." 
              className="w-full px-4 py-2 rounded-lg bg-white text-black placeholder:text-black focus:outline-none focus:ring-3 focus:ring-black"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer" />
            </button>
          </div>
        )}

        <ul className="flex space-x-4 text-white text-md font-semibold">
          <li className="flex flex-col items-center min-w-[80px]">
            <Link to="/" className="flex flex-col items-center hover:text-black">
              <FaStore className="text-3xl" />
              <span>STORE</span>
            </Link>
          </li>
          <li className="flex flex-col items-center min-w-[80px]">
            <Link to="/categories" className="flex flex-col items-center hover:text-black">
              <FaListAlt className="text-3xl" />
              <span>CATEGORIES</span>
            </Link>
          </li>
          <li className="flex flex-col items-center min-w-[80px]">
            <Link to="/products" className="flex flex-col items-center hover:text-black">
              <FaBox className="text-3xl" />
              <span>PRODUCTS</span>
            </Link>
          </li>
          <li className="flex flex-col items-center min-w-[80px]">
            <Link to="/" className="flex flex-col items-center hover:text-black">
              <FaAd className="text-3xl" />
              <span>ANNOUNCEMENTS</span>
            </Link>
          </li>
          <li className="flex flex-col items-center min-w-[80px]">
            <Link to="/cart" className="flex flex-col items-center hover:text-black">
              <FaShoppingCart className="text-3xl" />
              <span>CART</span>
            </Link>
          </li>
          <li className="flex flex-col items-center min-w-[80px]">
            <a href="#" className="flex flex-col items-center hover:text-black">
              <FaUserAlt className="text-3xl" />
              <span>PROFILE</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import { FaSearch, FaShoppingCart, FaUserAlt, FaListAlt, FaStore, FaBox } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-green-700 text-white p-4 w-full fixed top-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">ShopIt</h1>

        {location.pathname === "/" && (
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products ..." 
              className="px-4 py-2 w-100 rounded-lg bg-white text-black placeholder:text-black focus:outline-none focus:ring-3 focus:ring-black"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer" />
            </button>
          </div>
        )}

        <ul className="flex space-x-4 text-2xl font-semibold">
          <li>
            <Link to="/">
              <FaStore className="text-white hover:text-black" />
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <FaListAlt className="text-white hover:text-black" />
            </Link>
          </li>
          <li>
            <Link to="/products">
              <FaBox className="text-white hover:text-black" />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <FaShoppingCart className="text-white hover:text-black" />
            </Link>
          </li>
          <li>
            <a href="#">
              <FaUserAlt className="text-white hover:text-black" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

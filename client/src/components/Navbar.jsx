import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUserAlt, FaListAlt, FaStore, FaBox, FaAd, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { to: "/", icon: <FaStore className="text-3xl" />, label: "STORE" },
    { to: "/categories", icon: <FaListAlt className="text-3xl" />, label: "CATEGORIES" },
    { to: "/products", icon: <FaBox className="text-3xl" />, label: "PRODUCTS" },
    { to: "/announcements", icon: <FaAd className="text-3xl" />, label: "ANNOUNCEMENTS" },
    { to: "/cart", icon: <FaShoppingCart className="text-3xl" />, label: "CART" },
    { to: "#", icon: <FaUserAlt className="text-3xl" />, label: "PROFILE" },
  ];

  return (
    <nav className="bg-green-700 text-white p-4 w-full fixed top-0 z-50">
      <div className="flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">ShopIt</h1>

        {location.pathname === "/" && (
          <div className="hidden lg:block relative w-[400px] mx-6">
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

        <button className="lg:hidden text-3xl" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className="hidden lg:flex space-x-4 font-semibold">
          {navItems.map(({ to, icon, label }) => (
            <li key={label} className="flex flex-col items-center min-w-[80px]">
              <Link to={to} className="flex flex-col items-center hover:text-black">
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && (
        <ul
        className={`lg:hidden flex flex-col items-center bg-green-800 py-4 space-y-4 mt-2 text-md font-semibold overflow-hidden 
          transition-transform duration-500 ease-in-out ${menuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
        >
        {navItems.map(({ to, icon, label }) => (
            <li key={label}>
              <div className="w-48 text-left">
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-black text-white"
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

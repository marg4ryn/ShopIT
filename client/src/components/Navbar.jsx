import { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUserAlt, FaListAlt, FaStore, FaBox, FaAd, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSearchTerm } from '../context/SearchContext';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { searchTerm, setSearchTerm } = useSearchTerm();

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
    <nav className="bg-green-700 text-white h-[85px] w-full fixed top-0 z-50">
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center gap-3">
          <img
            src="/ShopItLogo.png"
            alt="ShopIt logo"
            className="w-14 h-14 object-contain"
          />
          <h1 className="text-3xl font-bold">ShopIt</h1>
        </div>

        {(location.pathname === "/" || location.pathname === "/products") && (
          <div className="relative w-full max-w-md mx-4 flex-shrink">
            <input 
              id="searchBar"
              type="text" 
              placeholder="Search products ..." 
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-2 rounded-lg bg-white text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-black pr-12"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-0 top-0 bottom-0 bg-gray-300 text-black px-4 py-2 rounded-r-lg hover:bg-gray-400 group-hover:bg-gray-400 cursor-pointer"
            >
              <FaSearch className="text-xl text-blue-500 cursor-pointer" />
            </button>
          </div>
        )}

        <button className="lg:hidden text-3xl font-bold" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className="hidden lg:flex space-x-4 font-semibold">
          {navItems.map(({ to, icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <li key={label} className="flex flex-col items-center min-w-[80px]">
                <Link
                  to={to}
                  className={`flex flex-col items-center ${
                    isActive ? 'text-black font-bold pointer-events-none opacity-60' : 'hover:text-black'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <ul
        className={`lg:hidden flex flex-col items-center bg-green-800 px-4 space-y-4 text-md font-semibold overflow-hidden transition-all duration-500 ease-in-out
          ${menuOpen ? "max-h-[500px] py-4 opacity-100" : "max-h-0 py-0 opacity-0"}
        `}
      >
        {navItems.map(({ to, icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <li key={label}>
              <div className="w-48 text-left">
                <Link
                  to={to}
                  onClick={() => !isActive && setMenuOpen(false)}
                  className={`flex items-center gap-3 ${
                    isActive
                      ? "text-black font-bold pointer-events-none opacity-60"
                      : "text-white hover:text-black"
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

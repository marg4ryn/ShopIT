const Navbar = () => {
    return (
      <nav className="bg-gray-800 text-white p-4 w-full fixed top-0">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ShopIt</h1>
          <div className="relative">
          <input 
            type="text" 
            placeholder="Szukaj produktów..." 
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
            🔍
          </button>
        </div>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-400">Sklep</a></li>
            <li><a href="#" className="hover:text-gray-400">Koszyk</a></li>
            <li><a href="#" className="hover:text-gray-400">Zaloguj się</a></li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  
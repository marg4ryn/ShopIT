const Navbar = () => {
    return (
      <nav className="bg-green-700 text-white p-4 w-full fixed top-0">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">ShopIt</h1>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products ..." 
              className="px-4 py-2 w-100 rounded-lg bg-white text-black placeholder:text-black focus:outline-none focus:ring-3 focus:ring-black"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">🔍</button>
          </div>
          <ul className="flex space-x-4 text-2xl font-semibold">
            <li><a href="#" className="hover:text-black">Store</a></li>
            <li><a href="#" className="hover:text-black">Cart</a></li>
            <li><a href="#" className="hover:text-black">Log in</a></li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  
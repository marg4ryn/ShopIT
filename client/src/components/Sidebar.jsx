import { ChevronLast, ChevronFirst } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchCategories } from '../api/categories';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const options = ["Most popular", "Descending price", "Rising price"];
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <aside>
      <nav className={`h-full pt-6 flex flex-col items-center border-0 transition-all duration-300 overflow-hidden ${expanded ? 'bg-neutral-800' : 'bg-neutral-900'}`}>
        
        <div className="p-4 pb-2 flex">
          <p className={`overflow-hidden transition-all text-xl font-bold text-center text-white ${expanded ? "w-64" : "w-0" }`}>SORTING</p>
          <button 
            onClick={() => setExpanded((curr) => !curr)} 
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <div className='p-4 pb-2 flex justify-between items-center'>
          <div className={`ml-2 ${expanded ? "w-64" : "w-0"} transition-all duration-300`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full px-4 py-2 bg-white text-black rounded-md flex justify-between items-center focus:outline-none focus:ring-3 focus:ring-black
                transition-opacity duration-300 ${expanded ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
            {selected}
            <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
          </button>

            {isOpen && (
              <ul className={`flex flex-col ${expanded ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-300 border-0 mt-1 bg-white rounded overflow-hidden`}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className={`${expanded ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-300 px-4 py-2 hover:bg-gray-100 cursor-pointer`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="p-4">
          <p className={`overflow-hidden text-xl font-bold text-center text-white ${expanded ? "w-64" : "w-0" } ${isOpen ? "mt-2" : "mt-0"}`}>FILTERING</p>
        </div>

        <div className={`p-4 pb-2 flex overflow-hidden justify-center items-center transition-all duration-300 ${expanded ? "w-64" : "w-0"}`}>
          {expanded && (
            <div className="text-center w-64">
              <h2 className="font-bold text-white">Price:</h2>
              <div className="flex justify-center gap-4 mt-2">
                <input
                  type="number"
                  placeholder="From"
                  className={`w-full px-4 py-2 bg-white text-black rounded-md flex justify-between items-center focus:outline-none focus:ring-3 focus:ring-black
                    transition-opacity duration-300 ${expanded ? "opacity-100 visible" : "opacity-0 invisible"}`}
                />
                <input
                  type="number"
                  placeholder="To"
                  className={`w-full px-4 py-2 bg-white text-black rounded-md flex justify-between items-center focus:outline-none focus:ring-3 focus:ring-black
                    transition-opacity duration-300 ${expanded ? "opacity-100 visible" : "opacity-0 invisible"}`}
                />
              </div>
            </div>
          )}
        </div>

        <div className={`p-4 pb-2 flex transition-all duration-300 ${expanded ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
          {expanded && (
            <div className="text-center w-64">
              <h2 className="font-bold text-white">Categories:</h2>
              <ul className={`space-y-2 mt-2`}>
                {categories.map((category) => (
                  <li 
                    key={category._id} 
                    className="flex justify-between items-center p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => toggleCategory(category.name)}
                  >
                    <span className="text-white font-semibold">{category.name}</span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={(e) => e.stopPropagation()}
                      className="cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={`w-fit p-4 pb-2 flex transition-all duration-300 ${expanded ? "max-w-64 opacity-100" : "max-w-0 opacity-0"}`}>
          <button
            className={`flex bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-all duration-300
              ${expanded ? "max-w-32 opacity-100" : "max-w-0 opacity-0"}`}
          >
            Apply filters
          </button>
        </div>

      </nav>
    </aside>
  )
}

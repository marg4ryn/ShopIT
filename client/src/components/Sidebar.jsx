import { ChevronLast, ChevronFirst } from "lucide-react"
import React, { useState } from "react";


export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  
  const options = ["Most popular", "Descending price", "Rising price"];
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["Electronics", "Clothing", "Books", "Toys"];
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="min-h-screen">
      <nav className={`h-full flex flex-col border-0 overflow-hidden ${expanded ? 'bg-neutral-800' : 'bg-neutral-900'}`}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <p className={`overflow-hidden transition-all text-xl font-bold text-center text-white ${expanded ? "w-64" : "w-0" }`}>Sorting</p>
          <button 
            onClick={() => setExpanded((curr) => !curr)} 
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <div className='p-4 pb-2 flex justify-between items-center'>
          <div className={`ml-2 ${expanded ? "w-64" : "w-0"} transition-all`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full px-4 py-2 bg-white text-black rounded-md flex justify-between items-center focus:outline-none focus:ring-3 focus:ring-black
                transition-opacity duration-300 ${expanded ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
            {selected}
            <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
          </button>

            {isOpen && (
              <ul className={`absolute ${expanded ? "w-64" : "w-0"} border-0 mt-1 bg-white rounded overflow-hidden`}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="p-4 pb-2 mt-12 flex justify-between items-center">
          <p className={`overflow-hidden transition-all text-xl font-bold text-center text-white ${expanded ? "w-64" : "w-0" }`}>Filtering</p>
        </div>

        <div className="p-4 pb-2 flex justify-center items-center w-full">
          <div className="text-center">
            <h2 className="font-bold text-white">Price:</h2>
            <div className="flex justify-center gap-4 mt-2">
              <input
                type="text"
                placeholder="From"
                className="px-4 py-2 bg-white w-32 border rounded-md"
              />
              <input
                type="text"
                placeholder="To"
                className="px-4 py-2 bg-white w-32 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="p-4 pb-2 flex justify-center items-center">
          <div className="text-center">
            <h2 className="font-bold text-white">Categories:</h2>
            <ul className={`space-y-2 ${expanded ? "" : "hidden"}`}>
              {categories.map((category) => (
                <li key={category} className="flex items-center mr-12 gap-2">
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={category} className="text-lg text-white">{category}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </nav>
    </aside>
  )
}

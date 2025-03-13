import { ChevronLast, ChevronFirst } from "lucide-react"
import { useState } from "react"

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  
  const options = ["Most popular", "Descending price", "Rising price"];
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="h-screen">
      <nav className={`h-full flex flex-col border-0 shadow-sm ${expanded ? 'bg-neutral-800' : 'bg-neutral-900'}`}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <p className={`overflow-hidden transition-all text-xl font-bold text-center text-white ${expanded ? "w-64" : "w-0" }`}>Sorting</p>
          <button 
            onClick={() => setExpanded((curr) => !curr)} 
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <div className='p-4 pb-2 flex justify-between items-center'>
          <div className={`relative ${expanded ? "w-64" : "w-0"} transition-all`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full px-4 py-2 bg-white text-black rounded-md flex justify-between items-center focus:outline-none focus:ring-3 focus:ring-black`}
            >
              {selected}
              <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <ul className={`absolute w-full mt-1 bg-white border rounded shadow-lg`}>
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
      </nav>
    </aside>
  )
}

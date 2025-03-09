import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      {/* Przycisk do chowania/pokazywania */}
      <button
        className={`fixed top-20 left-0 bg-gray-700 text-white px-3 py-1 rounded-r-lg z-50 transition-transform ${
          isOpen ? "translate-x-64" : "translate-x-0"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "←" : "→"}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-200 p-4 w-64 h-screen fixed top-14 left-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Filtry</h2>

        {/* Kategorie */}
        <div className="mb-4">
          <h3 className="font-semibold">Kategorie</h3>
          <ul>
            <li><input type="checkbox" /> Laptopy</li>
            <li><input type="checkbox" /> Smartfony</li>
            <li><input type="checkbox" /> Akcesoria</li>
          </ul>
        </div>

        {/* Sortowanie */}
        <div>
          <h3 className="font-semibold">Sortuj według</h3>
          <select className="w-full p-2 border rounded-lg">
            <option>Najniższa cena</option>
            <option>Najwyższa cena</option>
            <option>Najlepiej oceniane</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

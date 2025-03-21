import React, { useState } from 'react';

const QuantitySelector = ({ initialQuantity, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white border rounded w-20 h-12">
        <input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="w-16 text-center text-lg border-none focus:outline-none"
            min="1"
        />
    </div>
  );
};

export default QuantitySelector;

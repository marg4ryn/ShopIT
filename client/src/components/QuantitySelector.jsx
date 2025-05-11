import React, { useState } from 'react';

const QuantitySelector = ({ productId, initialQuantity, stock, onChange, onValueZero }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity == 0) {
      onValueZero(productId);
    } else if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= stock) {
      setQuantity(newQuantity);
      onChange(productId, newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between w-15 h-15 text-white">
      <input
        id={productId}
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-16 text-center text-lg border-none focus:outline-none text-white bg-transparent spin-white"
        min="0"
      />
    </div>
  );
};

export default QuantitySelector;

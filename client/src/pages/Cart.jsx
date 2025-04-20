import React, { useState } from 'react';
import QuantitySelector from '../components/QuantitySelector';
import OrderProgress from '../components/OrderProgress';

const cartItems = [
  { id: 1, name: "Laptop", quantity: 1, price: 1000 },
  { id: 2, name: "T-shirt", quantity: 2, price: 20 },
  { id: 3, name: "Headphones", quantity: 1, price: 50 },
];

const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

export default function Cart() {
  const [quantity, setQuantity] = useState(1);

  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Cart", "Shipping", "Payment", "Summary"];

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <main className="pt-18 mt-4 flex flex-col items-center justify-center">
    <div className="text-white min-h-screen p-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-none w-64">
          <OrderProgress currentStep={currentStep} steps={steps} />
        </div>
  
        <div className="flex-1 flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Your Cart</h1>
  
          <div className="mt-8">
            <ul className="space-y-4 text-black">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <div className="flex justify-between">
                    <div className="flex justify-between items-center p-4 rounded-md bg-white w-120 mr-4">
                      <div>
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xl font-semibold">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-col my-auto">
                      <QuantitySelector initialQuantity={quantity} onChange={handleQuantityChange} />
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-md bg-white">
                      <span className="text-lg font-semibold">${item.quantity * item.price}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
  
            <div className="mt-8 bg-white text-black p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Total</h3>
                <p className="text-2xl font-bold">${total}</p>
              </div>
            </div>
          </div>
  
          <div className="mt-8">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full w-full transition-all duration-300 ease-in-out">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>  
  );
}

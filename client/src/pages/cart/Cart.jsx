import React, { useState, useEffect } from 'react';
import QuantitySelector from '../../components/QuantitySelector';
import OrderProgress from '../../components/OrderProgress';

export default function Cart() {
  const [cart, setCart] = useState(getCartFromCookie());
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Cart', 'Shipping', 'Payment', 'Summary'];

  useEffect(() => {
    const fetchCartDetails = async () => {
      console.log(cart);
      if (cart.length === 0) {
        setCartItems([]);
        return;
      }

      const ids = cart.map(item => item.productId).join(',');
      const res = await fetch(`http://localhost:5000/products/bulk?ids=${ids}`, {
        credentials: 'include',
      });
      const products = await res.json();

      const merged = cart.map(item => {
        const product = products.find(p => p._id === item.productId);
        return product ? { ...product, quantity: item.quantity } : null;
      }).filter(Boolean);

      setCartItems(merged);
    };

    fetchCartDetails();
  }, [cart]);

  function getCartFromCookie() {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('cart='));
    if (!cookie) return [];
    try {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch (e) {
      return [];
    }
  }

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(updatedCart))}; path=/; max-age=${7 * 24 * 60 * 60}`;
  };

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="flex flex-col flex-grow justify-center items-center pt-10 mt-16 text-white">
        <h1 className="text-2xl font-bold text-center p-6">Your Cart</h1>

        <div className="flex flex-grow gap-4 justify-center items-center w-full">
          <div className="ml-12 w-24 mb-8">
            <OrderProgress currentStep={currentStep} steps={steps} />
          </div>
    
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="mt-8">
              <ul className="space-y-4 text-black">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-6">

                      <div className="flex justify-start items-center p-4 rounded-md bg-white w-80">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                      </div>

                      <div className="flex">
                        <QuantitySelector initialQuantity={item.quantity} onChange={handleQuantityChange} />
                      </div>

                      <div className="flex justify-start items-center p-4 rounded-md bg-white w-25">
                        <span className="text-lg font-semibold">${item.quantity * item.price}</span>
                      </div>

                  </li>
                ))}
              </ul>
            </div>
    
            <div className="flex flex-col my-8 space-y-4 justify-center items-center">
              <div className="flex gap-8 justify-between items-center mt-8 p-4 w-80 text-xl font-semibold">
                <h3 className="font-bold">Total:</h3>
                <div className="flex justify-center items-center bg-white text-black rounded-md p-4 w-40">
                  <p className="text-center">${total}</p>
                </div>
              </div>

              <button className="bg-green-600 hover:bg-green-700 font-semibold text-white px-2 py-4 rounded-lg w-80">
                Proceed to Checkout
              </button>
            </div>

          </div>
        </div>
    </div>
  );
}

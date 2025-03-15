export default function Cart() {
  const cartItems = [
    { id: 1, name: "Laptop", quantity: 1, price: 1000 },
    { id: 2, name: "T-shirt", quantity: 2, price: 20 },
    { id: 3, name: "Headphones", quantity: 1, price: 50 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <main className="flex-grow pt-18 p-4 mt-4 flex flex-col items-center justify-center">
      <div className="text-white min-h-screen p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Your Cart</h1>
        </div>

        <div className="mt-8">
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-400">Quantity: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xl font-semibold">${item.price}</p>
                  <p className="text-gray-400">Total: ${item.quantity * item.price}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 bg-gray-700 p-4 rounded-md">
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
    </main>    
  );
}

const products = [
    { id: 1, name: "Laptop ASUS", price: "2999 zł", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smartwatch", price: "599 zł", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Słuchawki bezprzewodowe", price: "199 zł", image: "https://via.placeholder.com/150" },
  ];
  
  const ProductList = () => {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold text-center mb-6">Najpopularniejsze produkty</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-lg rounded-lg text-center">
              <img src={product.image} alt={product.name} className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.price}</p>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Dodaj do koszyka
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductList;
  
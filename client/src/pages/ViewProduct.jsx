import { useParams } from "react-router-dom";

export default function ViewProduct() {
    const { id } = useParams();
    
    return (
        <main className="flex-grow pt-18">
            <div className="flex">
                <div className="flex-grow p-6 container mx-auto py-10"> 
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">Most popular products</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded-lg text-center w-300px">
                            <img src={product.image} alt={product.name} className="mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-700">{product.price}</p>
                            <button className="mt-4 mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            View product
                            </button>
                            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            Add to cart
                            </button>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>    
    );
}
  
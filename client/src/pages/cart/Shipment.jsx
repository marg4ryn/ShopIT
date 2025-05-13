import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigate } from "react-router-dom";
import OrderProgress from '../../components/OrderProgress';
import BackButton from '../../components/BackButton';

export default function Shipment() {
  const { currentStep, setCurrentStep } = useOrderContext();
  const { userData } = useUser();
  const navigate = useNavigate();

	useEffect(() => {
		setCurrentStep(2);
	}, []);
	
  return (
    <div className="flex flex-col flex-grow justify-center items-center pt-10 mt-16 ml-32 text-white">
        <h1 className="text-2xl font-bold text-center p-6">Shipment</h1>

        <div className="flex flex-grow gap-4 justify-center items-center w-full">
          <div className="fixed justify-center left-12 w-24 mb-8">
            <OrderProgress currentStep={currentStep}/>
          </div>
    
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="mt-8">
             
            </div>
    
            { true ? (
              <div className="flex justify-center items-center bg-white text-black rounded-lg p-4 w-64">
                <p className="text-center font-bold">No items in your cart</p>
              </div>
            ) : (
              <div className="flex flex-col my-8 space-y-4 justify-center items-center">
                <div className="flex gap-8 justify-between items-center mt-8 p-4 w-80 text-xl font-semibold">
                  <h3 className="font-bold">Total:</h3>
                  <div className="flex justify-center items-center bg-white text-black rounded-lg p-4 w-40">
                   
                  </div>
                </div>
                {userData ? (
                  <button className="bg-green-600 hover:bg-green-700 font-semibold text-white px-2 py-4 rounded-lg w-80">
                    Proceed to Checkout
                  </button>
                ) : (
                  <div className="flex flex-col justify-between items-center mt-8 p-4 w-80 text-md font-semibold">
                    <p className="font-semibold mb-2">If you wish to continue, please log in.</p>
                  <button 
                    className="text-xl bg-gray-700 font-semibold text-white px-2 py-4 rounded-lg w-80"
                    disabled={true}
                  >
                    Proceed to Checkout
                  </button>
                </div>

                )}
              </div>
            )}
           <BackButton onClick={() => 
							navigate(-1)
						} />
          </div>
        </div>
    </div>
  );
}

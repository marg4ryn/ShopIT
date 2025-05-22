import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/UserContext';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigate } from "react-router-dom";
import OrderProgress from '../../components/OrderProgress';
import BackButton from '../../components/BackButton';
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Payment() {
    const [selectedCarrier, setSelectedCarrier] = useState('');
    const carriers = ['InPost', 'DHL', 'DPD'];
    const { currentStep, setCurrentStep } = useOrderContext();
    const { userData } = useUser();
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
    <div className="flex flex-col flex-grow justify-center items-center w-full text-white mt-21 pt-8">

        <div className="flex flex-grow gap-4 items-center w-full">
          <div className="w-24 mb-8 mx-12">
            <OrderProgress currentStep={currentStep}/>
          </div>
    
          <div className="flex flex-col items-center justify-center w-full text-black">
            <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-60">
              {t('header.shipment')}
            </div>

              <div className="mt-8 flex flex-col 2xl:flex-row gap-6 px-6 items-stretch">
                <div className="flex flex-col gap-6 flex-1">

                  <div className="bg-white shadow-md rounded-lg p-6 w-160">
                    <h2 className="text-xl font-bold mb-4 text-center">{t('form.deliveryMethod')}</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {carriers.map(carrier => (
                        <label key={carrier} className={`cursor-pointer border rounded-lg p-4 w-32 text-center font-semibold
                          ${selectedCarrier === carrier ? 'border-green-500 bg-green-100' : 'border-gray-300'}`}>
                          <input
                            type="radio"
                            name="carrier"
                            value={carrier}
                            checked={selectedCarrier === carrier}
                            onChange={() => setSelectedCarrier(carrier)}
                            className="hidden"
                          />
                          {carrier}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex flex-col items-center my-6">
                <button 
                  className="bg-green-600 hover:bg-green-700 font-semibold text-white px-6 py-3 rounded-lg w-70"
                  onClick={() => 
                    navigate(`/payment`)
                  }
                >
                  {t('button.next')}
                </button>
              </div>

              <BackButton onClick={() => navigate(-1)} />
            </div>
        </div>
    </div>
  );
}
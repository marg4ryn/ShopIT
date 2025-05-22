import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/UserContext';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigate } from "react-router-dom";
import OrderProgress from '../../components/OrderProgress';
import BackButton from '../../components/BackButton';
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Shipment() {
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [selectedCarrier, setSelectedCarrier] = useState('');
  const carriers = ['InPost', 'DHL', 'DPD'];
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    house: '',
    apartment: '',
    city: '',
    zip: ''
  });
  const { currentStep, setCurrentStep } = useOrderContext();
  const { userData } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleContactChange = e => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({ ...prev, [name]: value }));
  };

	useEffect(() => {
		setCurrentStep(2);
	}, []);
	
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
                    <h2 className="text-xl font-bold mb-4 text-center">{t('form.contact')}</h2>
                    <div className="space-y-4">
                      <input type="text" name="name" placeholder={t('form.surname')} value={contactInfo.name} onChange={handleContactChange}
                        className="w-full p-2 border rounded" />
                      <input type="email" name="email" placeholder={t('form.email')} value={contactInfo.email} onChange={handleContactChange}
                        className="w-full p-2 border rounded" />
                      <input type="tel" name="phone" placeholder={t('form.phone')} value={contactInfo.phone} onChange={handleContactChange}
                        className="w-full p-2 border rounded" />
                    </div>
                  </div>

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

                <div className="flex-1 w-160">
                  <div className="bg-white shadow-md rounded-lg p-6 w-160 h-full flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-center">{t('form.address')}</h2>

                    <div className="flex-grow flex justify-center items-center">
                      <div className="flex flex-col space-y-4 w-full">
                      <input type="text" name="street" placeholder={t('form.address.street')} value={deliveryAddress.street} onChange={handleAddressChange}
                        className="w-full p-2 border rounded" />
                      <input type="text" name="house" placeholder={t('form.address.house')} value={deliveryAddress.house} onChange={handleAddressChange}
                        className="w-full p-2 border rounded" />
                      <input type="text" name="apartment" placeholder={t('form.address.apartment')} value={deliveryAddress.apartment} onChange={handleAddressChange}
                        className="w-full p-2 border rounded" />
                      <input type="text" name="city" placeholder={t('form.address.city')} value={deliveryAddress.city} onChange={handleAddressChange}
                        className="w-full p-2 border rounded" />
                      <input type="text" name="zip" placeholder={t('form.address.postalCode')} value={deliveryAddress.zip} onChange={handleAddressChange}
                        className="w-full p-2 border rounded" />
                    </div>
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

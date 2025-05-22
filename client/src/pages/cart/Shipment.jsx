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
    city: '',
    zip: '',
    country: ''
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
    <div className="flex flex-col flex-grow justify-center items-center pt-10 mt-26 ml-32 text-white">
        <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-60">
          {t('header.shipment')}
        </div>

        <div className="flex flex-grow gap-4 justify-center items-center w-full">
          <div className="fixed top-1/4 left-12 w-24 mb-8">
            <OrderProgress currentStep={currentStep}/>
          </div>
    
           <div className="flex flex-1 flex-col items-center justify-center">
              <div className="mt-8 w-full max-w-xl space-y-8">

                {/* FORMULARZ 1 – Dane kontaktowe */}
                <div className="bg-white shadow-md rounded-lg p-6 w-full">
                  <h2 className="text-xl font-bold mb-4">Dane kontaktowe</h2>
                  <div className="space-y-4">
                    <input type="text" name="name" placeholder="Imię i nazwisko" value={contactInfo.name} onChange={handleContactChange}
                      className="w-full p-2 border rounded" />
                    <input type="email" name="email" placeholder="Email" value={contactInfo.email} onChange={handleContactChange}
                      className="w-full p-2 border rounded" />
                    <input type="tel" name="phone" placeholder="Telefon" value={contactInfo.phone} onChange={handleContactChange}
                      className="w-full p-2 border rounded" />
                  </div>
                </div>

                {/* FORMULARZ 2 – Wybór dostawcy */}
                <div className="bg-white shadow-md rounded-lg p-6 w-full">
                  <h2 className="text-xl font-bold mb-4">Wybierz dostawcę</h2>
                  <div className="flex flex-wrap gap-4">
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

                {/* FORMULARZ 3 – Adres dostawy */}
                <div className="bg-white shadow-md rounded-lg p-6 w-full">
                  <h2 className="text-xl font-bold mb-4">Adres dostawy</h2>
                  <div className="space-y-4">
                    <input type="text" name="street" placeholder="Ulica i numer" value={deliveryAddress.street} onChange={handleAddressChange}
                      className="w-full p-2 border rounded" />
                    <input type="text" name="city" placeholder="Miasto" value={deliveryAddress.city} onChange={handleAddressChange}
                      className="w-full p-2 border rounded" />
                    <input type="text" name="zip" placeholder="Kod pocztowy" value={deliveryAddress.zip} onChange={handleAddressChange}
                      className="w-full p-2 border rounded" />
                    <input type="text" name="country" placeholder="Kraj" value={deliveryAddress.country} onChange={handleAddressChange}
                      className="w-full p-2 border rounded" />
                  </div>
                </div>

                {/* Przycisk zatwierdzający */}
                <div className="flex flex-col items-center">
                  {userData ? (
                    <button className="bg-green-600 hover:bg-green-700 font-semibold text-white px-6 py-3 rounded-lg w-full">
                      Złóż zamówienie
                    </button>
                  ) : (
                    <div className="w-full text-center">
                      <p className="mb-2">Aby kontynuować, zaloguj się.</p>
                      <button className="bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg w-full" disabled>
                        Złóż zamówienie
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <BackButton onClick={() => navigate(-1)} />
            </div>
        </div>
    </div>
  );
}

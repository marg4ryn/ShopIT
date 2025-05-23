import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigate } from "react-router-dom";
import OrderProgress from '../../components/OrderProgress';
import BackButton from '../../components/BackButton';
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Shipment() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const carriers = [
    { name: 'inpost', image: '/delivery/inpost-logo.jpg' },
    { name: 'dhl', image: '/delivery/dhl-logo.jpg' },
    { name: 'dpd', image: '/delivery/dpd-logo.jpg' }
  ];
  const { currentStep, setCurrentStep, orderData, updateOrder } = useOrderContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [contactInfo, setContactInfo] = useState({ 
    name: '',
    email: '', 
    phone: '' 
  });
  const [selectedCarrier, setSelectedCarrier] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    house: '',
    apartment: '',
    city: '',
    zip: ''
  });

  const validateForm = () => {
    const newErrors = {};

    if (!contactInfo.name.trim()) newErrors.name = 'form.error.surnameRequired';
    if (!contactInfo.email.trim()) newErrors.email = 'form.error.emailRequired';
    if (!contactInfo.phone.trim()) newErrors.phone = 'form.error.phoneRequired';

    if (!deliveryAddress.street.trim()) newErrors.street = 'form.error.streetRequired';
    if (!deliveryAddress.house.trim()) newErrors.house = 'form.error.houseRequired';
    if (!deliveryAddress.city.trim()) newErrors.city = 'form.error.cityRequired';
    if (!deliveryAddress.zip.trim()) newErrors.zip = 'form.error.zipRequired';

    if (!selectedCarrier) newErrors.carrier = 'form.error.carrierRequired';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContactChange = e => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
    errors[name] = value.trim() ? '' : 'form.error.' + name + 'Required';
  };

  const handleCarrierChange = (carrierName) => {
    setSelectedCarrier(carrierName)
    setErrors(prev => {
      const { carrier, ...rest } = prev;
      return rest;
    });
  };

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({ ...prev, [name]: value }));
    errors[name] = value.trim() ? '' : 'form.error.' + name + 'Required';
  };

	useEffect(() => {
		setCurrentStep(2);

    if (orderData.contactInfo) {
      setContactInfo(orderData.contactInfo);
    }
    if (orderData.deliveryAddress) {
      setDeliveryAddress(orderData.deliveryAddress);
    }
    if (orderData.selectedCarrier) {
      setSelectedCarrier(orderData.selectedCarrier);
    }
	}, []);

  const handleSubmit = () => {
    if (validateForm()) {
      updateOrder({
        contactInfo,
        deliveryAddress,
        selectedCarrier
      });
      navigate(`/payment`);
    }
  };

  return (
    <div className="flex flex-col flex-grow justify-center items-center w-full text-white mt-21 pt-8">

        <div className="flex flex-grow gap-4 items-center w-full">
          <div className="w-24 mb-8 mx-12">
            <OrderProgress currentStep={currentStep}/>
          </div>
    
          <div className="flex flex-col items-center justify-center w-full text-black mb-8">
            <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-60">
              {t('header.shipment')}
            </div>

              <div className="mt-8 flex flex-col 2xl:flex-row gap-6 px-6 items-stretch">
                <div className="flex flex-col gap-6 flex-1">
                  <div className="bg-white shadow-md rounded-lg p-6 w-160">
                    <h2 className="text-xl font-bold mb-4 text-center">{t('form.contact')}</h2>
                    <div className="">
                      <input type="text" name="name" placeholder={t('form.surname')} value={contactInfo.name} onChange={handleContactChange}
                        className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "border-black"}`} />
                        {errors.name && <p className="text-red-500 text-sm">{t(errors.name)}</p>}
                      <input type="email" name="email" placeholder={t('form.email')} value={contactInfo.email} onChange={handleContactChange}
                        className={`mt-4 w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-black"}`} />
                        {errors.email && <p className="text-red-500 text-sm">{t(errors.email)}</p>}
                      <input type="tel" name="phone" placeholder={t('form.phone')} value={contactInfo.phone} onChange={handleContactChange}
                        className={`mt-4 w-full p-2 border rounded ${errors.phone ? "border-red-500" : "border-black"}`} />
                        {errors.phone && <p className="text-red-500 text-sm">{t(errors.phone)}</p>}
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6 w-160">
                    <h2 className="text-xl font-bold mb-4 text-center">{t('form.deliveryMethod')}</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {carriers.map(carrier => (
                        <label
                          key={carrier.name}
                          className={`cursor-pointer border rounded-lg p-2 w-32 h-20 flex items-center justify-center
                            ${selectedCarrier === carrier.name ? 'border-green-500' : 'border-gray-300'}`}
                        >
                          <input
                            type="radio"
                            name="carrier"
                            value={carrier.name}
                            checked={selectedCarrier === carrier.name}
                            onChange={() => handleCarrierChange(carrier.name)}
                            className="hidden"
                          />
                          <img
                            src={carrier.image}
                            alt={carrier.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </label>
                      ))}
                      {errors.carrier && (
                        <p className="text-red-500 text-sm text-center w-full">{t(errors.carrier)}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-160">
                  <div className="bg-white shadow-md rounded-lg p-6 w-160 h-full flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-center">{t('form.address')}</h2>

                    <div className="flex-grow flex justify-center items-center">
                      <div className="flex flex-col w-full">
                      <input type="text" name="street" placeholder={t('form.address.street')} value={deliveryAddress.street} onChange={handleAddressChange}
                        className={`w-full p-2 border rounded ${errors.street ? "border-red-500" : "border-black"}`} />
                         {errors.street && <p className="text-red-500 text-sm">{t(errors.street)}</p>}
                      <input type="text" name="house" placeholder={t('form.address.house')} value={deliveryAddress.house} onChange={handleAddressChange}
                        className={`mt-4 w-full p-2 border rounded ${errors.house ? "border-red-500" : "border-black"}`} />
                         {errors.house && <p className="text-red-500 text-sm">{t(errors.house)}</p>}
                      <input type="text" name="apartment" placeholder={t('form.address.apartment')} value={deliveryAddress.apartment} onChange={handleAddressChange}
                        className={`mt-4 w-full p-2 border rounded `} />
                      <input type="text" name="city" placeholder={t('form.address.city')} value={deliveryAddress.city} onChange={handleAddressChange}
                        className={`mt-4 w-full p-2 border rounded ${errors.city ? "border-red-500" : "border-black"}`} />
                         {errors.city && <p className="text-red-500 text-sm">{t(errors.city)}</p>}
                      <input type="text" name="zip" placeholder={t('form.address.postalCode')} value={deliveryAddress.zip} onChange={handleAddressChange}
                        className={`mt-4 w-full p-2 border rounded ${errors.zip ? "border-red-500" : "border-black"}`} />
                         {errors.zip && <p className="text-red-500 text-sm">{t(errors.zip)}</p>}
                    </div>
                  </div>
                  </div>
               </div>
              </div>

              <div className="flex flex-col items-center my-6">
                <button 
                  className="bg-green-600 hover:bg-green-700 font-semibold text-white px-6 py-3 rounded-lg w-70"
                  onClick={() => 
                    handleSubmit()
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

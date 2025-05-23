import { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [operators] = useState([
    { name: 'payu', image: '/payment/payu.jpg' },
    { name: 'gpay', image: '/payment/gpay.jpg' },
    { name: 'paypo', image: '/payment/paypo.jpg' },
    { name: 'blik', image: '/payment/blik.jpg' },
    { name: 'paypal', image: '/payment/paypal.jpg' },
    { name: 'tpay', image: '/payment/tpay.jpg' },
    { name: 'traditional_transfer', image: '' },
    { name: 'online_payment_card', image: '' },
    { name: 'card_upon_receipt', image: '' },
    { name: 'cash_on_delivery', image: '' }
  ]);
  const [carriers] = useState([
    { name: 'inpost', image: '/delivery/inpost-logo.jpg' },
    { name: 'dhl', image: '/delivery/dhl-logo.jpg' },
    { name: 'dpd', image: '/delivery/dpd-logo.jpg' }
  ]);

  const { userData } = useUser();

  const [orderData, setOrderData] = useState({
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
    deliveryAddress: {
      street: '',
      house: '',
      apartment: '',
      city: '',
      zip: '',
    },
    selectedCarrier: '',
    selectedOperator: '',
  });

  useEffect(() => {
    if (userData?.name || userData?.email) {
     setOrderData(prev => ({
        ...prev,
        contactInfo: {
          name: userData.name || '',
          email: userData.email || '',
          phone: '',
        }
      }));
    }
    
  }, [userData]);

  const updateOrder = (partialData) => {
    setOrderData((prev) => ({
      ...prev,
      ...partialData,
    }));
  };

  const clearOrder = () => {
    setOrderData({
      contactInfo: {
        name: userData.name || '',
        email: userData.email || '',
        phone: '',
      },
      deliveryAddress: {
        street: '',
        house: '',
        apartment: '',
        city: '',
        zip: '',
      },
      selectedCarrier: '',
      selectedOperator: '',
    });
    setCurrentStep(1);
  };

  return (
    <OrderContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        orderData,
        updateOrder,
        clearOrder,
        carriers,
        operators,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

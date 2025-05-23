import { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
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
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

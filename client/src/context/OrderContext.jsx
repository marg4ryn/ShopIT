import { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [orderData, setOrderData] = useState({
    products: [],
    customerEmail: '',
    totalPrice: 0,
  });

  const updateOrder = (partialData) => {
    setOrderData((prev) => ({
      ...prev,
      ...partialData,
    }));
  };

  const clearOrder = () => {
    setOrderData({
      products: [],
      customerEmail: '',
      totalPrice: 0,
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

import { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const useOrderContext = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <OrderContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </OrderContext.Provider>
  );
};

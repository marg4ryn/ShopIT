import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigate } from "react-router-dom";
import OrderProgress from '../../components/OrderProgress';
import BackButton from '../../components/BackButton';
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Payment() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const { currentStep, setCurrentStep, orderData, updateOrder } = useOrderContext();
  const navigate = useNavigate();

  const [selectedOperator, setSelectedOperator] = useState('');
  const operators = [
    { name: 'payu', image: '/payment/payu.jpg' },
    { name: 'gpay', image: '/payment/gpay.jpg' },
    { name: 'paypo', image: '/payment/paypo.jpg' },
    { name: 'blik', image: '/payment/blik.jpg' },
    { name: 'paypal', image: '/payment/paypal.jpg' },
    { name: 'tpay', image: '/payment/tpay.jpg' },
    { name: t('payment.traditional_transfer'), image: '' },
    { name: t('payment.online_payment_card'), image: '' },
    { name: t('payment.card_upon_receipt'), image: '' },
    { name: t('payment.cash_on_delivery'), image: '' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!selectedOperator) newErrors.operator = 'form.error.operatorRequired';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOperatorChange = (operatorName) => {
    setSelectedOperator(operatorName);
    setErrors(prev => {
      const { operator, ...rest } = prev;
      return rest;
    });
  };

  useEffect(() => {
    setCurrentStep(3);
    if (orderData.selectedOperator) {
      setSelectedOperator(orderData.selectedOperator);
    }
  }, []);

  const handleSubmit = () => {
    if (validateForm()) {
      updateOrder({
        selectedOperator
      });
      navigate(`/summary`);
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
              {t('header.payment')}
            </div>

              <div className="mt-8 flex flex-col 2xl:flex-row gap-6 px-6 items-stretch">
                <div className="flex flex-col gap-6 flex-1">

                 <div className="bg-white shadow-md rounded-lg p-6 max-w-200">
                    <h2 className="text-xl font-bold mb-4 text-center">{t('form.paymentMethod')}</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {operators.map(operator => (
                        <label
                          key={operator.name}
                          className={`flex items-center justify-center text-center cursor-pointer border rounded-lg p-4 w-32 font-semibold whitespace-normal break-words
                            ${selectedOperator === operator.name ? 'border-green-500' : 'border-gray-300'}`}
                        >
                          <input
                            type="radio"
                            name="operator"
                            value={operator}
                            checked={selectedOperator === operator.name}
                            onChange={() => handleOperatorChange(operator.name)}
                            className="hidden"
                          />

                          {operator.image ? (
                            <img
                              src={operator.image}
                              alt={operator.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span>{operator.name}</span>
                          )}
                        </label>
                      ))}
                      {errors.operator && (
                        <p className="text-red-500 text-sm text-center w-full">{t(errors.operator)}</p>
                      )}
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
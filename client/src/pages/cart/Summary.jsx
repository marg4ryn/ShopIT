import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrderContext } from '../../context/OrderContext';
import { createOrder } from '../../api/orders';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getProduct } from "../../api/products";
import OrderProgress from '../../components/OrderProgress';
import BackButton from '../../components/BackButton';
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Summary() {
  const [loading, setLoading] = useState(true);
	const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
	const [errors, setErrors] = useState({});
	const [isAccepted, setIsAccepted] = useState(false);
  const { t } = useTranslation();
  const { currentStep, setCurrentStep, orderData } = useOrderContext();
	const { getAccessTokenSilently } = useAuth0();   
  const navigate = useNavigate();

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
  const carriers = [
    { name: 'inpost', image: '/delivery/inpost-logo.jpg' },
    { name: 'dhl', image: '/delivery/dhl-logo.jpg' },
    { name: 'dpd', image: '/delivery/dpd-logo.jpg' }
  ];
  const [contactInfo, setContactInfo] = useState({ 
    name: '',
    email: '', 
    phone: '' 
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    house: '',
    apartment: '',
    city: '',
    zip: ''
  });
	const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState('');

  useEffect(() => {
    setCurrentStep(4);

		if (orderData.contactInfo) {
      setContactInfo(orderData.contactInfo);
    }
    if (orderData.deliveryAddress) {
      setDeliveryAddress(orderData.deliveryAddress);
    }
    if (orderData.selectedCarrier) {
      setSelectedCarrier(orderData.selectedCarrier);
    }
		if (orderData.selectedOperator) {
      setSelectedOperator(orderData.selectedOperator);
    }
  }, []);

	useEffect(() => {
		const getCartFromCookie = async () => {
			try {
				setCart(JSON.parse(localStorage.getItem('cart')));
			} catch (error) {
				setCart([]);
			} finally {
				setLoading(false);
			}
		}

		getCartFromCookie();
	}, []);

	useEffect(() => {
		const fetchCartDetails = async () => {
			if (cart?.length === 0) {
				setCartItems([]);
				return;
			}

			const productPromises = cart.map(item => getProduct(item.id));
			const products = await Promise.all(productPromises);

			const merged = cart.map(item => {
				const product = products.find(p => p._id === item.id);
				return product ? { ...product, quantity: item.quantity } : null;
			}).filter(Boolean);

			setCartItems(merged);
		};

		fetchCartDetails();
	}, [cart]);

  const validateForm = () => {
    const newErrors = {};
    if (!isAccepted) newErrors.terms = 'form.error.termsRequired';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

	const handleTermsChange = () => {
    setIsAccepted(!isAccepted);
    setErrors(prev => {
      const { terms, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async () => {
		if (!validateForm()) return;

		try {
			const token = await getAccessTokenSilently();
			const {
				contactInfo,
				deliveryAddress,
				selectedCarrier,
				selectedOperator
			} = orderData;

			const payload = {
				products: cart.map(p => ({
					productId: p._id,
					quantity: p.quantity
				})),
				totalPrice: cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
				customerName: contactInfo.name,
				customerEmail: contactInfo.email,
				customerPhone: contactInfo.phone,
				delivery: {
					street: deliveryAddress.street,
					house: deliveryAddress.house,
					apartment: deliveryAddress.apartment,
					city: deliveryAddress.city,
					postcode: deliveryAddress.zip,
					method: selectedCarrier
				},
				selectedOperator
			};

			await createOrder(token, payload);
			navigate('/');
		} catch (error) {
			console.error('Błąd przy tworzeniu zamówienia:', error);
			alert('Nie udało się złożyć zamówienia. Spróbuj ponownie później.');
		}
  };

	const selectedCarrierObject = carriers.find(c => c.name === selectedCarrier);
	const selectedOperatorObject = operators.find(o => o.name === selectedOperator);
	const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
    <div className="flex flex-col flex-grow justify-center items-center w-full text-white mt-21 pt-8">

        <div className="flex flex-grow gap-4 items-center w-full">
          <div className="w-24 mb-8 mx-12">
            <OrderProgress currentStep={currentStep}/>
          </div>
    
          <div className="flex flex-col items-center justify-center w-full text-black mb-8">
            <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-60">
              {t('header.summary')}
            </div>

              <div className="mt-8 flex flex-col gap-6 px-6 items-stretch">

								<div className="flex flex-col 2xl:flex-row gap-6 items-stretch">
									<div className=" shadow-md rounded-lg w-full">
										<ul className="space-y-4 text-black w-160">
											{cartItems.map((item) => (
												<li key={item._id} className="flex gap-6 bg-white rounded-lg">
														<div className="flex justify-start items-center p-4 w-26">
															<img
																src={`http://localhost:3000${item.imageUrls?.[0] || "/images/No_Image_Available.jpg"}`}
																alt={item.name}
																className="h-22 object-contain"
															/>
														</div>

														<div className="flex justify-center items-start p-4 w-80 flex-col">
															<h3 className="font-semibold">{item.name}</h3>
															<p>{t('form.quantity')}: {item.quantity}</p>
														</div>

														<div className="flex justify-center items-center p-4 w-30 text-xl">
															<span className="font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
														</div>
												</li>
											))}
										</ul>
									</div>
									<div className="bg-white shadow-md rounded-lg p-6 w-full flex justify-center items-center text-2xl 2xl:flex-col gap-2">
										<p className="">{t('form.total')}</p>
										<p className="font-bold">${total.toFixed(2)}</p>
									</div>
								</div>

								<div className="flex flex-col 2xl:flex-row gap-6 items-stretch">
									<div className="flex flex-col gap-6 flex-1">
										<div className="bg-white shadow-md rounded-lg p-6 w-160">
											<h2 className="text-xl font-bold mb-4 text-center">{t('form.contact')}</h2>
											<div className="">
												<input type="text" name="name" placeholder={t('form.surname')} value={contactInfo.name} disabled={true}
													className={`w-full p-2 border rounded`} />
												<input type="email" name="email" placeholder={t('form.email')} value={contactInfo.email} disabled={true}
													className={`mt-4 w-full p-2 border rounded`} />
												<input type="tel" name="phone" placeholder={t('form.phone')} value={contactInfo.phone} disabled={true}
													className={`mt-4 w-full p-2 border rounded`} />
											</div>
										</div>

										<div className="flex flex-row gap-6 flex-1">
											<div className="bg-white shadow-md rounded-lg p-6 w-77">
												<h2 className="text-xl font-bold mb-4 text-center">{t('form.selectedCarrier')}</h2>
												<div className="flex flex-wrap gap-4 justify-center">
													{selectedCarrierObject && (
														<label className="border rounded-lg p-2 w-32 h-20 flex items-center justify-center">
															<input
																type="radio"
																name="carrier"
																disabled={true}
																value={selectedCarrierObject.name}
																className="hidden"
															/>
															<img
																src={selectedCarrierObject.image}
																alt={selectedCarrierObject.name}
																className="max-h-full max-w-full object-contain"
															/>
														</label>
													)}
												</div>
											</div>

											<div className="bg-white shadow-md rounded-lg p-6 w-77">
												<h2 className="text-xl font-bold mb-4 text-center">{t('form.selectedOperator')}</h2>
												<div className="flex flex-wrap gap-4 justify-center">
													{selectedOperatorObject && (
														<label className="border rounded-lg p-2 w-32 h-20 flex items-center justify-center">
															<input
																type="radio"
																name="operator"
																disabled={true}
																value={selectedOperatorObject.name}
																className="hidden"
															/>
															<img
																src={selectedOperatorObject.image}
																alt={selectedOperatorObject.name}
																className="max-h-full max-w-full object-contain"
															/>
														</label>
													)}
												</div>
											</div>
										</div>
									</div>

									<div className="flex-1 w-160">
										<div className="bg-white shadow-md rounded-lg p-6 w-160 h-full flex flex-col">
											<h2 className="text-xl font-bold mb-4 text-center">{t('form.address')}</h2>

											<div className="flex-grow flex justify-center items-center">
												<div className="flex flex-col w-full">
												<input type="text" name="street" placeholder={t('form.address.street')} value={deliveryAddress.street} disabled={true}
													className={`w-full p-2 border rounded`} />
												<input type="text" name="house" placeholder={t('form.address.house')} value={deliveryAddress.house} disabled={true}
													className={`mt-4 w-full p-2 border rounded`} />
												<input type="text" name="apartment" placeholder={t('form.address.apartment')} value={deliveryAddress.apartment} disabled={true}
													className={`mt-4 w-full p-2 border rounded `} />
												<input type="text" name="city" placeholder={t('form.address.city')} value={deliveryAddress.city} disabled={true}
													className={`mt-4 w-full p-2 border rounded`} />
												<input type="text" name="zip" placeholder={t('form.address.postalCode')} value={deliveryAddress.zip} disabled={true}
													className={`mt-4 w-full p-2 border rounded`} />
											</div>
										</div>
										</div>
									</div>
								</div>

								<div className="flex flex-col 2xl:flex-row gap-6 items-stretch">
									<div className="bg-white shadow-md rounded-lg p-6 w-full">
										<label className="flex items-center space-x-2">
											<input
												type="checkbox"
												name="terms"
												value={isAccepted}
												onChange={() => handleTermsChange()}
												className="form-checkbox h-5 w-5 text-green-600"
											/>
											<span className="text-sm">
												{t('others.terms1')}&nbsp;
												<a href="/statute" target="_blank" className="text-blue-600 underline">
													{t('others.terms2')}
												</a>
											</span>
										</label>
										{errors.terms && <p className="pt-4 text-red-500 text-sm">{t('form.error.termsRequired')}</p>}
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
                  {t('button.confirm')}
                </button>
              </div>

              <BackButton onClick={() => navigate(-1)} />
            </div>
        </div>
    </div>
  );
}
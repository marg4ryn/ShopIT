import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getOrderById } from '../../api/orders';
import BackButton from '../../components/BackButton';
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Summary() {
  const [loading, setLoading] = useState(true);	
	const [order, setOrder] = useState([]);
	const { userData } = useUser();
  const { t } = useTranslation();
	const { id } = useParams();
	const { getAccessTokenSilently } = useAuth0();
	const appUrl = import.meta.env.VITE_APP_URL;
	const navigate = useNavigate();

		useEffect(() => {
			const fetchOrder = async () => {
				try {
					const token = await getAccessTokenSilently();
					const result = await getOrderById(token, id);
					setOrder(result);
				} catch (err) {
					console.error(t('error.orders.fetchOrder'), err);
				} finally {
					setLoading(false);
				}
			};

			fetchOrder();
		}, [userData]);

    return (
    <div className="flex flex-col flex-grow justify-center items-center w-full text-white mt-21 pt-8">
      {loading ? <LoadingSpinner /> : (

        <div className="flex flex-grow gap-4 items-center w-full">
          <div className="flex flex-col items-center justify-center w-full text-black mb-8">
            <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-60">
              {t('header.summary')}
            </div>

              <div className="mt-8 flex flex-col gap-6 px-6 items-stretch">

								<div className="flex flex-col 2xl:flex-row gap-6 items-stretch">
									<div className=" shadow-md rounded-lg w-full">
										<ul className="space-y-4 text-black w-160">
											{order.products.map((item) => (
												<li key={item._id} className="flex gap-6 bg-white rounded-lg">
														<div className="flex justify-start items-center p-4 w-26">
															<img
																src={`${appUrl}${item.imageUrls?.[0] || "/images/No_Image_Available.jpg"}`}
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
												<div className="flex flex-wrap gap-4 justify-center items-center text-center font-semibold ">
													{selectedOperatorObject && (
														<label className="border rounded-lg p-2 w-32 h-20 flex items-center justify-center">
															<input
																type="radio"
																name="operator"
																disabled={true}
																value={selectedOperatorObject.name}
																className="hidden"
															/>
															{selectedOperatorObject.image ? (
																<img
																	src={selectedOperatorObject.image}
																	alt={selectedOperatorObject.name}
																	className="max-h-full max-w-full object-contain"
																/>
															) : (
																<span>{t('payment.' + selectedOperatorObject.name)}</span>
															)}
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
							</div>
              <BackButton onClick={() => navigate(-1)} />
            </div>
        </div>
			)} 
    </div>
  );
}
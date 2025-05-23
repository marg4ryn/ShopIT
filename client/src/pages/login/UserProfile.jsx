import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { getOrdersByEmail } from '../../api/orders';
import LoadingSpinner from "../../components/LoadingSpinner";

const UserProfile = () => {
		const [loading, setLoading] = useState(true);
		const [orders, setOrders] = useState([]);
    const { logout, getAccessTokenSilently } = useAuth0();
    const { userData } = useUser();  
  	const { t } = useTranslation();

		useEffect(() => {
			const fetchOrders = async () => {
				try {
					const token = await getAccessTokenSilently();
					const result = await getOrdersByEmail(token,userData?.email);
					setOrders(result);
				} catch (err) {
					console.error(t('error.products.fetchProducts'), err);
				} finally {
					setLoading(false);
				}
			};

			if (userData?.email) {
				fetchOrders();
			}
			console.log(orders);
		}, [userData]);

		return (
			<div className="flex-grow flex pt-18 justify-center items-center">
				{loading ? <LoadingSpinner /> : (
				<div className={`mx-auto h-[420px] flex justify-between`}>
					<div className={`bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto h-[420px] flex flex-col justify-between mr-8`}>
							<div>
								<div className="flex justify-center mb-4 relative">
										<img
											src={userData.picture || "/user-profile-default.png"}
											alt="User Profile"
											className="w-32 h-32 rounded-full robject-cove border-2 border-gray-300"
										/>       
								</div>

								<div className="flex flex-col">
										<label htmlFor="userName" className="text-black font-lg font-bold pb-2">{t('form.username')}</label>
										<input
												id="userName"
												type="text"
												autoComplete="username"
												disabled={true}
												className={`w-full border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
												value={userData.name}
										/>
								</div>

								<div className="flex flex-col mt-2">
										<label htmlFor="userEmail" className="text-black font-lg font-bold pb-2">{t('form.email')}</label>
										<input
												id="userEmail"
												type="text"
												disabled={true}
												className={`w-full border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
												value={userData.email}
										/>
								</div>
							</div>
	
							<div className="mt-4 flex justify-center space-x-4">
									<button
											onClick={() =>
													logout({
															logoutParams: {
																	returnTo: window.location.origin,
															},
													})
											}
											className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-30"
									>
											{t('button.logOut')}
									</button>
							</div>
					</div>
					<div className="flex-grow flex flex-col gap-4">
							<div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center">
									{t('subHeader.yourOrders')}
							</div>

							<div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-200">
									{t('subHeader.yourReviews')}
							</div>
					</div>
					</div>
				)}
			</div>
	);
}

export default UserProfile;

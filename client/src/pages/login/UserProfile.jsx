import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from '../../context/UserContext';

const UserProfile = () => {
    const { logout } = useAuth0();
    const { userData } = useUser();    

		return (
			<div className="flex-grow flex pt-18 justify-center items-center">
				<div className={`mx-auto h-[420px] flex justify-between`}>
					<div className={`bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto h-[420px] flex flex-col justify-between mr-8`}>
							<div>
								<div className="flex justify-center mb-4 relative">
										<img
												src={userData.picture || "/user-profile-default.png"}
												alt="User Profile"
												className="w-32 h-32 rounded-full robject-cove border-2 border-gray-300"
												onClick={() => {}}
										/>       
								</div>

								<div className="flex flex-col">
										<label htmlFor="userName" className="text-black font-lg font-bold pb-2">Username</label>
										<input
												id="userName"
												type="text"
												disabled={true}
												className={`w-full border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black`}
												value={userData.name}
												onChange={() => {}}
										/>
								</div>

								<div className="flex flex-col mt-2">
										<label htmlFor="userEmail" className="text-black font-lg font-bold pb-2">Email</label>
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
											Log Out
									</button>
							</div>
					</div>
					<div className="flex-grow flex flex-col gap-4">
							<div className="flex-grow bg-white rounded-lg p-4 w-150 h-50">
									<h3 className="text-lg font-semibold">YOUR ORDERS</h3>
							</div>
							<div className="flex-grow bg-white rounded-lg p-4 w-150 h-50">
									<h3 className="text-lg font-semibold">YOUR REVIEWS</h3>
							</div>
					</div>
					</div>
			</div>
	);
}

export default UserProfile;

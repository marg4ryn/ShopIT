import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button
                className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                onClick={() => logout()}
            >
                Log out
            </button>
        )
    );
}

export default LogoutButton;
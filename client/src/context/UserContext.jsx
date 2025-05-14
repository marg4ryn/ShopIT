import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const authRoles = import.meta.env.VITE_AUTH0_ROLES;
  const [userData, setUserData] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { user, getAccessTokenSilently, isLoading: authLoading } = useAuth0();

 useEffect(() => {
    if (!authLoading) {
      if (user) {
        setUserData(user);
        const userRoles = user[authRoles] || ["guest"];
        setRoles(userRoles);
      }
      setIsUserLoading(false);
    }
  }, [user, authLoading]);

  return (
    <UserContext.Provider value={{ userData, roles, getAccessTokenSilently, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

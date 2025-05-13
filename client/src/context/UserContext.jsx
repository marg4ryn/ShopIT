import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (user) {
      setUserData(user);
      const userRoles = user["https://shopit.com/roles"] || ["guest"];
      setRoles(userRoles);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ userData, roles, getAccessTokenSilently }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

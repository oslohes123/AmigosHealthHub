import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialDeleteAccount = '/api/user/changeProfileDetails/deleteAccount';
let deleteAccountRoute;
if (usingDeployedServer) {
  deleteAccountRoute = `${serverURL}${partialDeleteAccount}`;
} else {
  deleteAccountRoute = `http://${ipAddress}:${port}${partialDeleteAccount}`;
}
export default function deleteAccountWrapper() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  // Provide just the password, email is taken from the 'user' context

  const deleteAccount = async (password) => {
    setIsLoading(true);
    setError(null);

    try {
      const { id } = user;

      const { token } = JSON.parse(
        (await AsyncStorage.getItem('user')),
      );
      const response = await fetch(
        deleteAccountRoute,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
          body: JSON.stringify({
            userid: id,
            password,
          }),
        },
      );

      const json = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(json.mssg);
        if (response.status === 401) { logout(); }
      }
      if (response.ok) {
        try {
          setIsLoading(false);
          logout();
        } catch (error) {
          setError(true);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setError(true);
    }
  };
  return { deleteAccount, isLoading, error };
}

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialChangePasswordRoute = '/api/user/changeProfileDetails/password';
let changePasswordRoute;
if (usingDeployedServer) {
  changePasswordRoute = `${serverURL}${partialChangePasswordRoute}`;
} else {
  changePasswordRoute = `http://${ipAddress}:${port}${partialChangePasswordRoute}`;
}
export default function useChangeProfilePassword() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const changePassword = async (old_password, new_password) => {
    setIsLoading(true);
    setError(null);

    try {
      // AsyncStorage contains: firstName, email and token
      const { email } = user;
      const { token } = JSON.parse(await AsyncStorage.getItem('user'));
      const response = await fetch(changePasswordRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ email, oldPassword: old_password, newPassword: new_password }),
      });

      const json = await response.json();

      if (!response.ok) {
        if (response.status === 401) { logout(); }
        setIsLoading(false);
        setError(json.mssg);
      }
      if (response.ok) {
        try {
          // Log the user out if change details is successful

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
  return { changePassword, isLoading, error };
}

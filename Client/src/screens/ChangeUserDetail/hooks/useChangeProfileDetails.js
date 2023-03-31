import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';
// import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../../Authentication/hooks/useLogOut';

const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const serverURL = process.env.URL;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialChangeProfileDetailsRoute = '/api/user/changeProfileDetails/stats';
let changeProfileDetailsRoute;
if (usingDeployedServer) {
  changeProfileDetailsRoute = `${serverURL}${partialChangeProfileDetailsRoute}`;
} else {
  changeProfileDetailsRoute = `http://${ipAddress}:${port}${partialChangeProfileDetailsRoute}`;
}
export default function useChangeProfileDetails() {
  const { logout } = useLogout();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const changeStats = async (
    firstName,
    lastName,
    newEmail,
    age,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // AsyncStorage contains: firstName, email and token
      const { email } = user;

      const { token } = JSON.parse(
        (await AsyncStorage.getItem('user')),
      );

      const response = await fetch(
        changeProfileDetailsRoute,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            age,
            prevEmail: email,
            newEmail,
          }),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        if (response.status === 401) { logout(); }
        setIsLoading(false);
        setError(json.mssg);
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
  return { changeStats, isLoading, error };
}

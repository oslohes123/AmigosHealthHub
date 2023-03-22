import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';
// import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../../Authentication/hooks/useLogOut';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;

export default function useChangeProfileDetails() {
  console.log(`port: ${port}`);
  const { logout } = useLogout();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  console.log('In changeProfile');

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
      console.log(`In useChangeProfileDetails, email: ${email}, token:${token}`);
      console.log(`In useChangeProfileDetails : ${ipAddress} : Port ${port}`);

      const response = await fetch(
        `http://${ipAddress}:${port}/api/user/changeProfileDetails/stats`,
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
        console.log(error);
      }
      if (response.ok) {
        try {
          setIsLoading(false);
          logout();
        } catch (error) {
          setError(true);
          setIsLoading(false);
          console.error(error);
        }
      }
    } catch (error) {
      console.log('In useChangeProfileDetails');
      console.error(error);
    }
  };
  return { changeStats, isLoading, error };
};

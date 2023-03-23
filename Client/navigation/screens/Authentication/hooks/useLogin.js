import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/AuthContext';
// const dotenv = require("dotenv");
// dotenv.config();
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const loginRoute = `http://${ipAddress}:${port}/api/user/login`;
export default function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  console.log(`port: ${port}`);
  console.log(`ipAddress: ${ipAddress}`);
  console.log(JSON.stringify(process.env));

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      loginRoute,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
    );

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.mssg);
    }
    if (response.ok) {
      try {
        // sets user properties from API to 'user' in AsyncStorage, so it can 'remember' a user
        await AsyncStorage.setItem('user', JSON.stringify(json));

        dispatch({ type: 'LOGIN', payload: json });

        setIsLoading(false);
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
      }
    }
  };

  return { login, isLoading, error };
}

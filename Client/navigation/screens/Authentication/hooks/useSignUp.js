import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const signUpRoute = `http://${ipAddress}:${port}/api/user/sign_up`;
export default function useSignUp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (
    email,
    firstName,
    lastName,
    age,
    password,
    calories,
  ) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      signUpRoute,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          age,
          password,
          calories,
        }),
      },
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.mssg);
    }
    if (response.ok) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(json));

        dispatch({ type: 'LOGIN', payload: json });

        setIsLoading(false);
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
      }
    }
  };

  return { signup, isLoading, error };
}

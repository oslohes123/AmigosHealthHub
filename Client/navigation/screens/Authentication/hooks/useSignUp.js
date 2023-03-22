import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/AuthContext';
// const dotenv = require("dotenv");
// dotenv.config();
const serverURL = process.env.URL;

export default function useSignUp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  console.log('In useSignUp');
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
    console.log('In signup');
    console.log(
      `body: ${JSON.stringify({
        email,
        firstName,
        lastName,
        age,
        password,
        calories,
      })}`,
    );
    console.log(`${serverURL}/api/user/sign_up`);
    const response = await fetch(
      `${serverURL}/api/user/sign_up`,
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

/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;

const getCaloriesBurntTodayRoute = `http://${ipAddress}:${port}/api/user/workout/calories/getToday`;

export default function useGetCaloriesBurntToday() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;

  const getCaloriesBurntToday = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getCaloriesBurntTodayRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid },
    });

    const getCaloriesBurntTodayJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(getCaloriesBurntTodayJSON.mssg);
      return null;
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getCaloriesBurntTodayJSON.totalCaloriesBurnt; // this is a single number
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return null;
      }
    }
  };

  return { getCaloriesBurntToday, isLoading, error };
}

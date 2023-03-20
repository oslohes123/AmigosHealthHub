/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getWorkoutHistoryRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/getAll`;

export default function useGetWorkoutHistory() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const userid = user.id;
  const getWorkoutHistory = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getWorkoutHistoryRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid },
    });

    const getWorkoutHistoryJSON = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(getWorkoutHistoryJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getWorkoutHistoryJSON.workoutsNamesAndDates;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getWorkoutHistory, isLoading, error };
}

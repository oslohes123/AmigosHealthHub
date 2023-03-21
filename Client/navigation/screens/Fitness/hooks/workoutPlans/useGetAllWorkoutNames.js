/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;

const getAllWorkoutNamesRoute = `http://${ipAddress}:${port}/api/user/workout/getAllWorkoutNames`;

export default function useGetAllWorkoutNames() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;
  // const { dispatch } = useAuthContext();

  const getAllWorkoutNames = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getAllWorkoutNamesRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid },
    });

    const getAllWorkoutNamesJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(getAllWorkoutNamesJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getAllWorkoutNamesJSON.arrayOfAllWorkouts;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getAllWorkoutNames, isLoading, error };
}

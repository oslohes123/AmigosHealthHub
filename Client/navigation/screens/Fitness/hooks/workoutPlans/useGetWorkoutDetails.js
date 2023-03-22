/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getWorkoutDetailsRoute = `http://${ipAddress}:${port}/api/user/workout/get`;

export default function useGetWorkoutDetails() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const getWorkoutDetails = async (workoutname) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(getWorkoutDetailsRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', userid: id, workoutname, Authorization: token,
      },
    });

    const getWorkoutDetailsJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(getWorkoutDetailsJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getWorkoutDetailsJSON.workoutToReturn; // this is an array
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getWorkoutDetails, isLoading, error };
}

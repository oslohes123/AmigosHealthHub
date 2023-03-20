/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getLastTrackedWorkoutRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/lastTrackedWorkout`;

export default function useGetLastTrackedWorkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const userid = user.id;
  const getLastTrackedWorkout = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getLastTrackedWorkoutRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid },
    });

    const getLastTrackedWorkoutJSON = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(getLastTrackedWorkoutJSON.mssg);
      return 'Not Available';
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getLastTrackedWorkoutJSON.lastTrackedWorkout;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return 'Not Available';
      }
    }
  };

  return { getLastTrackedWorkout, isLoading, error };
}

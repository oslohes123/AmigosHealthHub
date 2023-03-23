/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
const getLastTrackedWorkoutRoute = `${serverURL}/api/user/completedWorkouts/lastTrackedWorkout`;

export default function useGetLastTrackedWorkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const getLastTrackedWorkout = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getLastTrackedWorkoutRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getLastTrackedWorkoutJSON = await response.json();
    console.log(`getLastTrackedWorkoutJSON: ${JSON.stringify(getLastTrackedWorkoutJSON)}`);
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

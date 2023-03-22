/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getTrackedWorkoutDetailsRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/get`;

export default function useGetTrackedWorkoutDetails() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  // Parameters: workout, date and time.
  const getTrackedWorkoutDetails = async (workoutname, date, time) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getTrackedWorkoutDetailsRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        userid: id,
        workoutname,
        date,
        time,
        Authorization: token,
      },
    });

    const getTrackedWorkoutDetailsJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(getTrackedWorkoutDetailsJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getTrackedWorkoutDetailsJSON.workoutToReturn; // this is an array
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getTrackedWorkoutDetails, isLoading, error };
}

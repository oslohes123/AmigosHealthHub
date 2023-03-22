/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getWorkoutHistoryByDateRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/workoutHistoryByDate`;

export default function useGetWorkoutHistoryByDate() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const getWorkoutHistoryByDate = async (date) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getWorkoutHistoryByDateRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', userid: id, date, Authorization: token,
      },
    });

    const getWorkoutHistoryByDateJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(getWorkoutHistoryByDateJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return {
          arrayOfWorkoutNamesAndIDs: getWorkoutHistoryByDateJSON.arrayOfWorkoutNamesAndIDs,
          graphLabels: getWorkoutHistoryByDateJSON.graphLabels,
          graphData: getWorkoutHistoryByDateJSON.graphData,
        };
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getWorkoutHistoryByDate, isLoading, error };
}

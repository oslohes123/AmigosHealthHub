/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;

const getExerciseHistoryRoute = `http://${ipAddress}:${port}/api/user/exercise/history`;

export default function useGetExerciseHistory() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;

  const getExerciseHistory = async (nameofexercise) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getExerciseHistoryRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid, nameofexercise },
    });

    const getExerciseHistoryJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(getExerciseHistoryJSON.mssg);
      return null;
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return {
          labels: getExerciseHistoryJSON.arrayOfDates,
          data: getExerciseHistoryJSON.data,
          type: getExerciseHistoryJSON.type,
        };
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return null;
      }
    }
  };

  return { getExerciseHistory, isLoading, error };
}

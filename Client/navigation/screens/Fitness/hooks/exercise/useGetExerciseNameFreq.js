/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getExerciseNameFreqRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/exerciseNameFreq`;

export default function useGetExerciseNameFreq() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const userid = user.id;

  const getExerciseNameFreq = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getExerciseNameFreqRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid },
    });

    const getExerciseNameFreqJSON = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(getExerciseNameFreqJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return {
          exerciseNameLabels: getExerciseNameFreqJSON.graphLabels,
          exerciseNameData: getExerciseNameFreqJSON.graphData,
        };
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getExerciseNameFreq, isLoading, error };
}

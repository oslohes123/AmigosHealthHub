/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getExerciseNameTypeRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/exerciseTypeFreq`;

export default function useGetExerciseTypeFreq() {
  const [getErrorGetExerciseType, setErrorGetExerciseType] = useState(null);
  const [isLoadingExerciseType, setIsLoadingExerciseType] = useState(null);

  const { user } = useAuthContext();
  const { id, token } = user;

  const getExerciseTypeFreq = async () => {
    setIsLoadingExerciseType(true);
    setErrorGetExerciseType(null);

    const response = await fetch(getExerciseNameTypeRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getExerciseTypeFreqJSON = await response.json();
    if (!response.ok) {
      setIsLoadingExerciseType(false);
      setErrorGetExerciseType(getExerciseTypeFreqJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoadingExerciseType(false);
        return {
          exerciseTypeLabels: getExerciseTypeFreqJSON.graphLabels,
          exerciseTypeData: getExerciseTypeFreqJSON.graphData,
        };
      } catch (caughtError) {
        setErrorGetExerciseType(caughtError);
        setIsLoadingExerciseType(false);
        return [];
      }
    }
  };

  return { getExerciseTypeFreq, isLoadingExerciseType, getErrorGetExerciseType };
}

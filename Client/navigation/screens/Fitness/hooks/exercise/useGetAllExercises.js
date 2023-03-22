/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getAllExercisesRoute = `http://${ipAddress}:${port}/api/user/exercise/getAll`;

export default function useGetAllExercises() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;

  const getAllExercises = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getAllExercisesRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid },
    });

    const getAllExercisesJSON = await response.json();
    console.log(`getAllExercisesJSON: ${JSON.stringify(getAllExercisesJSON)}`);
    if (!response.ok) {
      setIsLoading(false);
      setError(getAllExercisesJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getAllExercisesJSON.arrayOfExerciseNames;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getAllExercises, isLoading, error };
}

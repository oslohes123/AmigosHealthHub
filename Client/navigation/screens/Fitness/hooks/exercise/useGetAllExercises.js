/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
const getAllExercisesRoute = `${serverURL}/api/user/exercise/getAll`;

export default function useGetAllExercises() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;

  const getAllExercises = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getAllExercisesRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
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

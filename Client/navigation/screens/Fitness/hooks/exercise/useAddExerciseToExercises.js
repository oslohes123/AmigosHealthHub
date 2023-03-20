/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const addExerciseToExercisesRoute = `http://${ipAddress}:${port}/api/user/exercise/add`;

export default function useAddExerciseToExercises() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;

  const addExerciseToExercises = async (
    type,
    name,
    muscle,
    difficulty,
    instructions,
    equipment,
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(addExerciseToExercisesRoute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', userid },
      body: JSON.stringify({
        type,
        name,
        muscle,
        difficulty,
        instructions,
        equipment,
      }),
    });

    const addExerciseToExercisesJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(addExerciseToExercisesJSON.mssg);
      return null;
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return addExerciseToExercisesJSON.exerciseID;
      } catch (errorCaught) {
        setError(errorCaught);
        setIsLoading(false);
        return null;
      }
    }
  };

  return { addExerciseToExercises, isLoading, error };
}

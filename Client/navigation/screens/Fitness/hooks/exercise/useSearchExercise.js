/* eslint-disable consistent-return */
import { useState } from 'react';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const searchExerciseRoute = `http://${ipAddress}:${port}/api/user/exercise/search`;

export default function useSearchExercise() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();

  const searchExercise = async (wordToSearch) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(searchExerciseRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', wordToSearch },
    });

    const searchedExercisesJson = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(searchedExercisesJson.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return searchedExercisesJson.searchedWords;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
      }
    }
  };

  return { searchExercise, isLoading, error };
}

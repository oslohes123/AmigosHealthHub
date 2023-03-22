/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getExerciseByNameRoute = `http://${ipAddress}:${port}/api/user/exercise/get`;

export default function useGetExerciseByName() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const { token } = user;
  const getExerciseByName = async (exercisename) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getExerciseByNameRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', exercisename, Authorization: token },
    });

    const getExerciseByNameJSON = await response.json();
    // console.log(getExerciseByNameJSON);
    if (!response.ok) {
      setIsLoading(false);
      setError(getExerciseByNameJSON.mssg);
      return null;
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getExerciseByNameJSON.exerciseInformation;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return null;
      }
    }
  };

  return { getExerciseByName, isLoading, error };
}

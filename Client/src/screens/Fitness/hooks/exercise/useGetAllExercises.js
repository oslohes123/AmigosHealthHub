/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const getAllExercisesRoute = `${serverURL}/api/user/exercise/getAll`;

const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetAllExercises = '/api/user/exercise/getAll';
let getAllExercisesRoute;
if (usingDeployedServer) {
  getAllExercisesRoute = `${serverURL}${partialGetAllExercises}`;
} else {
  getAllExercisesRoute = `http://${ipAddress}:${port}${partialGetAllExercises}`;
}
export default function useGetAllExercises() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();

  const getAllExercises = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getAllExercisesRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getAllExercisesJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
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

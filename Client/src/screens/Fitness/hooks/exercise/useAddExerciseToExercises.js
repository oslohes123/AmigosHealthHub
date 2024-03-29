/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const addExerciseToExercisesRoute = `${serverURL}/api/user/exercise/add`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialAddExerciseToExercises = '/api/user/exercise/add';
let addExerciseToExercisesRoute;
if (usingDeployedServer) {
  addExerciseToExercisesRoute = `${serverURL}${partialAddExerciseToExercises}`;
} else {
  addExerciseToExercisesRoute = `http://${ipAddress}:${port}${partialAddExerciseToExercises}`;
}
export default function useAddExerciseToExercises() {
  const { logout } = useLogout();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;

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
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
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
      if (response.status === 401) { logout(); }
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

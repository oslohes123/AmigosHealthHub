/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const getExerciseByNameRoute = `${serverURL}/api/user/exercise/get`;

const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetExerciseByNameRoute = '/api/user/exercise/get';
let getExerciseByNameRoute;
if (usingDeployedServer) {
  getExerciseByNameRoute = `${serverURL}${partialGetExerciseByNameRoute}`;
} else {
  getExerciseByNameRoute = `http://localhost:3001${partialGetExerciseByNameRoute}`;
}

export default function useGetExerciseByName() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const { token } = user;
  const { logout } = useLogout();
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
      if (response.status === 401) { logout(); }
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

/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const getExerciseNameFreqRoute = `${serverURL}/api/user/completedWorkouts/exerciseNameFreq`;

const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetExerciseNameFreqRoute = '/api/user/completedWorkouts/exerciseNameFreq';
let getExerciseNameFreqRoute;
if (usingDeployedServer) {
  getExerciseNameFreqRoute = `${serverURL}${partialGetExerciseNameFreqRoute}`;
} else {
  getExerciseNameFreqRoute = `http://localhost:3001${partialGetExerciseNameFreqRoute}`;
}
export default function useGetExerciseNameFreq() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const getExerciseNameFreq = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getExerciseNameFreqRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getExerciseNameFreqJSON = await response.json();

    if (!response.ok) {
      if (response.status === 401) { logout(); }
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

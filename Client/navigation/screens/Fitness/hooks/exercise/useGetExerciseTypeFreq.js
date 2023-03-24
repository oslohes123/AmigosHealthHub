/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const getExerciseNameTypeRoute = `${serverURL}/api/user/completedWorkouts/exerciseTypeFreq`;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetExerciseNameTypeRoute = '/api/user/completedWorkouts/exerciseTypeFreq';
let getExerciseNameTypeRoute;
if (usingDeployedServer) {
  getExerciseNameTypeRoute = `${serverURL}${partialGetExerciseNameTypeRoute}`;
} else {
  getExerciseNameTypeRoute = `http://${ipAddress}:${port}${partialGetExerciseNameTypeRoute}`;
}

export default function useGetExerciseTypeFreq() {
  const [getErrorGetExerciseType, setErrorGetExerciseType] = useState(null);
  const [isLoadingExerciseType, setIsLoadingExerciseType] = useState(null);

  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const getExerciseTypeFreq = async () => {
    setIsLoadingExerciseType(true);
    setErrorGetExerciseType(null);

    const response = await fetch(getExerciseNameTypeRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getExerciseTypeFreqJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
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

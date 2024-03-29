/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const workoutFreqRoute = `${serverURL}/api/user/completedWorkouts/workoutFreq`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialWorkoutFreqRoute = '/api/user/completedWorkouts/workoutFreq';
let workoutFreqRoute;
if (usingDeployedServer) {
  workoutFreqRoute = `${serverURL}${partialWorkoutFreqRoute}`;
} else {
  workoutFreqRoute = `http://${ipAddress}:${port}${partialWorkoutFreqRoute}`;
}
export default function useTrackedWorkoutFreq() {
  const [getErrorGetWorkoutFreq, setErrorGetWorkoutFreq] = useState(null);
  const [isLoadingGetWorkoutFreq, setIsLoadingGetWorkoutFreq] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();

  const getTrackedWorkoutFreq = async () => {
    setIsLoadingGetWorkoutFreq(true);
    setErrorGetWorkoutFreq(null);
    const response = await fetch(workoutFreqRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getTrackedWorkoutFreqJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoadingGetWorkoutFreq(false);
      setErrorGetWorkoutFreq(getTrackedWorkoutFreqJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoadingGetWorkoutFreq(false);
        return {
          workoutNameLabels: getTrackedWorkoutFreqJSON.graphLabels,
          workoutNameData: getTrackedWorkoutFreqJSON.graphData,
        };
      } catch (error) {
        setErrorGetWorkoutFreq(error);
        setIsLoadingGetWorkoutFreq(false);
        return [];
      }
    }
  };

  return { getTrackedWorkoutFreq, isLoadingGetWorkoutFreq, getErrorGetWorkoutFreq };
}

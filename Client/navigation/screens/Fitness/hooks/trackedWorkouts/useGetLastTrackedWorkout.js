/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const getLastTrackedWorkoutRoute = `${serverURL}/api/user/completedWorkouts/lastTrackedWorkout`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetLastTrackedWorkoutRoute = '/api/user/completedWorkouts/lastTrackedWorkout';
let getLastTrackedWorkoutRoute;
if (usingDeployedServer) {
  getLastTrackedWorkoutRoute = `${serverURL}${partialGetLastTrackedWorkoutRoute}`;
} else {
  getLastTrackedWorkoutRoute = `http://${ipAddress}:${port}${partialGetLastTrackedWorkoutRoute}`;
}
export default function useGetLastTrackedWorkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const getLastTrackedWorkout = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getLastTrackedWorkoutRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getLastTrackedWorkoutJSON = await response.json();
    console.log(`getLastTrackedWorkoutJSON: ${JSON.stringify(getLastTrackedWorkoutJSON)}`);
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(getLastTrackedWorkoutJSON.mssg);
      return 'Not Available';
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getLastTrackedWorkoutJSON.lastTrackedWorkout;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return 'Not Available';
      }
    }
  };

  return { getLastTrackedWorkout, isLoading, error };
}

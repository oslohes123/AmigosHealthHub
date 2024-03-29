/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const getWorkoutHistoryRoute = `${serverURL}/api/user/completedWorkouts/getAll`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetWorkoutHistoryRoute = '/api/user/completedWorkouts/getAll';
let getWorkoutHistoryRoute;
if (usingDeployedServer) {
  getWorkoutHistoryRoute = `${serverURL}${partialGetWorkoutHistoryRoute}`;
} else {
  getWorkoutHistoryRoute = `http://${ipAddress}:${port}${partialGetWorkoutHistoryRoute}`;
}
export default function useGetWorkoutHistory() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const getWorkoutHistory = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getWorkoutHistoryRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getWorkoutHistoryJSON = await response.json();

    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(getWorkoutHistoryJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getWorkoutHistoryJSON.workoutsNamesAndDates;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getWorkoutHistory, isLoading, error };
}

/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetWorkoutHistoryByDateRoute = '/api/user/completedWorkouts/workoutHistoryByDate';
let getWorkoutHistoryByDateRoute;
if (usingDeployedServer) {
  getWorkoutHistoryByDateRoute = `${serverURL}${partialGetWorkoutHistoryByDateRoute}`;
} else {
  getWorkoutHistoryByDateRoute = `http://${ipAddress}:${port}${partialGetWorkoutHistoryByDateRoute}`;
}
export default function useGetWorkoutHistoryByDate() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const getWorkoutHistoryByDate = async (date) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getWorkoutHistoryByDateRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', userid: id, date, Authorization: token,
      },
    });

    const getWorkoutHistoryByDateJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(getWorkoutHistoryByDateJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return {
          arrayOfWorkoutNamesAndIDs: getWorkoutHistoryByDateJSON.arrayOfWorkoutNamesAndIDs,
          graphLabels: getWorkoutHistoryByDateJSON.graphLabels,
          graphData: getWorkoutHistoryByDateJSON.graphData,
        };
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getWorkoutHistoryByDate, isLoading, error };
}

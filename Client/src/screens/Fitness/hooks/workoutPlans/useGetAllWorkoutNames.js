/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const getAllWorkoutNamesRoute = `${serverURL}/api/user/workout/getAllWorkoutNames`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetAllWorkoutNamesRoute = '/api/user/workout/getAllWorkoutNames';
let getAllWorkoutNamesRoute;
if (usingDeployedServer) {
  getAllWorkoutNamesRoute = `${serverURL}${partialGetAllWorkoutNamesRoute}`;
} else {
  getAllWorkoutNamesRoute = `http://${ipAddress}:${port}${partialGetAllWorkoutNamesRoute}`;
}
export default function useGetAllWorkoutNames() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  // const { dispatch } = useAuthContext();
  const { logout } = useLogout();
  const getAllWorkoutNames = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getAllWorkoutNamesRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, Authorization: token },
    });

    const getAllWorkoutNamesJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(getAllWorkoutNamesJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getAllWorkoutNamesJSON.arrayOfAllWorkouts;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getAllWorkoutNames, isLoading, error };
}

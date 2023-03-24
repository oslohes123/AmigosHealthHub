/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const getWorkoutDetailsRoute = `${serverURL}/api/user/workout/get`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetWorkoutDetailsRoute = '/api/user/workout/get';
let getWorkoutDetailsRoute;
if (usingDeployedServer) {
  getWorkoutDetailsRoute = `${serverURL}${partialGetWorkoutDetailsRoute}`;
} else {
  getWorkoutDetailsRoute = `http://${ipAddress}:${port}${partialGetWorkoutDetailsRoute}`;
}
export default function useGetWorkoutDetails() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const getWorkoutDetails = async (workoutname) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(getWorkoutDetailsRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', userid: id, workoutname, Authorization: token,
      },
    });

    const getWorkoutDetailsJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(getWorkoutDetailsJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getWorkoutDetailsJSON.workoutToReturn; // this is an array
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getWorkoutDetails, isLoading, error };
}

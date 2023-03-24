/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const getTrackedWorkoutDetailsRoute = `${serverURL}/api/user/completedWorkouts/get`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetTrackedWorkoutDetailsRoute = '/api/user/completedWorkouts/get';
let getTrackedWorkoutDetailsRoute;
if (usingDeployedServer) {
  getTrackedWorkoutDetailsRoute = `${serverURL}${partialGetTrackedWorkoutDetailsRoute}`;
} else {
  getTrackedWorkoutDetailsRoute = `http://localhost:3001${partialGetTrackedWorkoutDetailsRoute}`;
}
export default function useGetTrackedWorkoutDetails() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  // Parameters: workout, date and time.
  const getTrackedWorkoutDetails = async (workoutname, date, time) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getTrackedWorkoutDetailsRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        userid: id,
        workoutname,
        date,
        time,
        Authorization: token,
      },
    });

    const getTrackedWorkoutDetailsJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(getTrackedWorkoutDetailsJSON.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getTrackedWorkoutDetailsJSON.workoutToReturn; // this is an array
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return [];
      }
    }
  };

  return { getTrackedWorkoutDetails, isLoading, error };
}

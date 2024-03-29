/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetCaloriesBurntTodayRoute = '/api/user/workout/calories/getToday';
let getCaloriesBurntTodayRoute;
if (usingDeployedServer) {
  getCaloriesBurntTodayRoute = `${serverURL}${partialGetCaloriesBurntTodayRoute}`;
} else {
  getCaloriesBurntTodayRoute = `http://${ipAddress}:${port}${partialGetCaloriesBurntTodayRoute}`;
}

export default function useGetCaloriesBurntToday() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { id, token } = user;
  const getCaloriesBurntToday = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getCaloriesBurntTodayRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', userid: id, authorization: token },
    });

    const getCaloriesBurntTodayJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(getCaloriesBurntTodayJSON.mssg);
      return null;
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return getCaloriesBurntTodayJSON.totalCaloriesBurnt; // this is a single number
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return null;
      }
    }
  };

  return { getCaloriesBurntToday, isLoading, error };
}

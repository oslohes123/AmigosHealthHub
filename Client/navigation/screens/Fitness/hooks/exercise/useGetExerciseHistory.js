/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const getExerciseHistoryRoute = `${serverURL}/api/user/exercise/history`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetExerciseHistoryRoute = '/api/user/exercise/history';
let getExerciseHistoryRoute;
if (usingDeployedServer) {
  getExerciseHistoryRoute = `${serverURL}${partialGetExerciseHistoryRoute}`;
} else {
  getExerciseHistoryRoute = `http://${ipAddress}:${port}${partialGetExerciseHistoryRoute}`;
}
export default function useGetExerciseHistory() {
  const [errorExerciseHistory, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const getExerciseHistory = async (nameofexercise) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getExerciseHistoryRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', userid: id, nameofexercise, Authorization: token,
      },
    });

    const getExerciseHistoryJSON = await response.json();
    console.log(`getExerciseHistoryJSON: ${JSON.stringify(getExerciseHistoryJSON)}`);
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(getExerciseHistoryJSON.mssg);
      return null;
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return {
          labels: getExerciseHistoryJSON.arrayOfDates,
          data: getExerciseHistoryJSON.data,
          type: getExerciseHistoryJSON.type,
        };
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
        return null;
      }
    }
  };

  return { getExerciseHistory, isLoading, errorExerciseHistory };
}

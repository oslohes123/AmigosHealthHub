import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialAddSleepRoute = '/api/user/sleep/add';
let addSleepRoute;
if (usingDeployedServer) {
  addSleepRoute = `${serverURL}${partialAddSleepRoute}`;
} else {
  addSleepRoute = `http://${ipAddress}:${port}${partialAddSleepRoute}`;
}
export default function useAddSleep() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const { id } = user;
  const { token } = user;
  const { logout } = useLogout();

  const addSleep = async (
    hoursSleptInput,
    sleepQualityInput,
    timestampInput,
  ) => {
    setIsLoading(true);

    const response = await fetch(
      addSleepRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          userID: id,
          hoursSlept: hoursSleptInput,
          sleepQuality: sleepQualityInput,
          timestamp: timestampInput,
        }),
      },
    );

    const responseJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(responseJSON.mssg);
    } else if (response.ok) {
      setError(null);
      setIsLoading(false);
      return responseJSON.sleep;
    }
  };

  return { addSleep, isLoading, error };
}

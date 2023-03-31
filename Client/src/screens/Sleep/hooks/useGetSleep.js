import moment from 'moment';
import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialGetSleepRoute = '/api/user/sleep/get';
let getSleepRoute;
if (usingDeployedServer) {
  getSleepRoute = `${serverURL}${partialGetSleepRoute}`;
} else {
  getSleepRoute = `http://${ipAddress}:${port}${partialGetSleepRoute}`;
}

export default function useGetSleep() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const { id } = user;
  const { token } = user;
  const { logout } = useLogout();

  const getSleep = async () => {
    setIsLoading(true);
    const today = moment().format('YYYY-MM-DD');
    const sevenDaysAgo = moment().subtract(6, 'days').format('YYYY-MM-DD');

    const response = await fetch(
      getSleepRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          userID: id,
          startDate: sevenDaysAgo,
          endDate: today,
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

  return { getSleep, isLoading, error };
}

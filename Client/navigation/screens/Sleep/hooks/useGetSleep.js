import moment from 'moment';
import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';

const serverURL = process.env.URL;

export default function useGetSleep() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const { id } = user;
  const { token } = user;

  const getSleep = async () => {
    setIsLoading(true);
    const today = moment().format('YYYY-MM-DD');
    const sevenDaysAgo = moment().subtract(6, 'days').format('YYYY-MM-DD');

    // console.log(`full getSleep user: ${JSON.stringify(user)}`);
    // console.log(`getUserInfo ip_address: ${ip_address} : Port ${port}`);
    // console.log(`id in getUserInfo: ${id}`);
    // console.log(`Time from ${today} to ${sevenDaysAgo}  `);
    const response = await fetch(
      `${serverURL}/api/user/sleep/get`,
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
    // console.log(`respornse of getSleep: ${JSON.stringify(response)}`);
    const responseJSON = await response.json();
    // console.log(responseJSON);
    if (!response.ok) {
      setIsLoading(false);
      setError(responseJSON.mssg);
      console.log('Error in get sleep');
    } else if (response.ok) {
      setError(null);
      setIsLoading(false);
      return responseJSON.sleep;
    }
  };

  return { getSleep, isLoading, error };
}

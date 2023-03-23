import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';

const serverURL = process.env.URL;

export default function useAddSleep() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const { id } = user;
  const { token } = user;

  const addSleep = async (
    hoursSleptInput,
    sleepQualityInput,
    timestampInput,
  ) => {
    setIsLoading(true);

    console.log(`full addSleep user: ${JSON.stringify(user)}`);
    console.log(`id in addSleep: ${id}`);
    console.log(
      `useAddSleep data-> hoursslept ${hoursSleptInput}, sleepquality ${sleepQualityInput}, timestamp ${timestampInput}`,
    );
    const response = await fetch(
      `${serverURL}/api/user/sleep/add`,
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
    console.log(`respornse of addSleep: ${JSON.stringify(response)}`);
    const responseJSON = await response.json();
    console.log(responseJSON);
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

  return { addSleep, isLoading, error };
}

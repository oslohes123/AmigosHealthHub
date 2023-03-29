// Hook to be called when submit button is pressed to send request to route to add data to supabase
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialAddWordFaceValueRoute = '/api/user/mentalHealth/rateMental';
let addWordFaceValueRoute;
if (usingDeployedServer) {
  addWordFaceValueRoute = `${serverURL}${partialAddWordFaceValueRoute}`;
} else {
  addWordFaceValueRoute = `http://${ipAddress}:${port}${partialAddWordFaceValueRoute}`;
}
export default function useSubmit() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // get the current users ID thats currently logged in
  const { user } = useAuthContext();
  const { id } = user;

  const submit = async (face, word) => {
    setIsLoading(true);
    setError(null);
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    // make a post request with the data and the accountID the data should be sent with respect to
    const response = await fetch(
      addWordFaceValueRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ userid: id, face, word }),
      },
    );
    // get the response and test if it returns an ok or error response
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.mssg);
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        setError(json.mssg);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  };
  return { submit, isLoading, error };
}

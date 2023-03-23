// Get the users (thats currently logged in) word of the day
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
const todaysWordRoute = `${serverURL}/api/user/mentalHealth/todaysWord`;

export default function useGetTodaysWord() {
  const [errorTodaysWord, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // get the current users ID thats currently logged in
  const { user } = useAuthContext();
  const userID = user.id;
  // make a get request to get the recent word
  const getTodaysWord = async () => {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      todaysWordRoute,
      {
        method: 'GET',
        headers: { id: userID, authorization: token },
      },
    );
    const json = await response.json();
    console.log(`json ln 30: ${JSON.stringify(json)}`);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.mssg);
      return null;
    }
    // if the response shows there was no error, return the word
    if (response.ok) {
      try {
        setIsLoading(false);
        return json.word;
      } catch (error) {
        // setError(error);
        setIsLoading(false);
        return 'Not Available';
      }
    }
  };
  return { getTodaysWord, isLoading, errorTodaysWord };
}

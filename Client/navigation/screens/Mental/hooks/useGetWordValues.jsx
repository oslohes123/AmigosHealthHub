// Get the most recent word values to place into the wordcloud
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const wordValuesRoute = `http://${ipAddress}:${port}/api/user/mentalHealth/wordcloud`;

export const useGetWordValues = () => {
  // get the current users ID thats currently logged in
  const { user } = useAuthContext();
  const userID = user.id;
  // make a get request to get the most recent 7(max) word values
  const getWordValues = async () => {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    const response = await fetch(
      wordValuesRoute,
      {
        method: 'GET',
        headers: { id: userID, authorization: token },
      },
    );
    const json = await response.json();
    if (!response.ok) {
      return [0];
    }
    // if the response shows there was no error, return the words
    if (response.ok) {
      try {
        return json;
      } catch (error) {
        return [0];
      }
    }
  };
  return { getWordValues };
};

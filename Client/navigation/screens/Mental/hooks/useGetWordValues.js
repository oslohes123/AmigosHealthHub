// Get the most recent word values to place into the wordcloud
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
// const wordValuesRoute = `${serverURL}/api/user/mentalHealth/wordcloud`;

const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialWordValuesRoute = '/api/user/mentalHealth/wordcloud';
let wordValuesRoute;
if (usingDeployedServer) {
  wordValuesRoute = `${serverURL}${partialWordValuesRoute}`;
} else {
  wordValuesRoute = `http://localhost:3001${partialWordValuesRoute}`;
}

export default function useGetWordValues() {
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
}

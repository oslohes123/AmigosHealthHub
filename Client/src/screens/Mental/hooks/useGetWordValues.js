// Get the most recent word values to place into the wordcloud
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const wordValuesRoute = `${serverURL}/api/user/mentalHealth/wordcloud`;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialWordValuesRoute = '/api/user/mentalHealth/wordcloud';
let wordValuesRoute;
if (usingDeployedServer) {
  wordValuesRoute = `${serverURL}${partialWordValuesRoute}`;
} else {
  wordValuesRoute = `http://${ipAddress}:${port}${partialWordValuesRoute}`;
}

export default function useGetWordValues() {
  // get the current users ID thats currently logged in
  const { user } = useAuthContext();
  const userID = user.id;
  const { logout } = useLogout();

  // make a get request to get the most recent 7(max) word values
  const getWordValues = async () => {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    const response = await fetch(
      wordValuesRoute,
      {
        method: 'GET',
        headers: { userid: userID, authorization: token },
      },
    );
    const json = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
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

// Get the date values for the most recent 7 (max) submissions to put into x-axis of the line graph
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const dateValuesRoute = `${serverURL}/api/user/mentalHealth/dateValues`;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialDateValuesRoute = '/api/user/mentalHealth/dateValues';
let dateValuesRoute;
if (usingDeployedServer) {
  dateValuesRoute = `${serverURL}${partialDateValuesRoute}`;
} else {
  dateValuesRoute = `http://${ipAddress}:${port}${partialDateValuesRoute}`;
}
export default function useuseGetDateValues() {
  // get the current users ID thats currently logged in
  const { user } = useAuthContext();
  const userID = user.id;
  const { logout } = useLogout();

  const getDateValues = async () => {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    // make a get request to get the data of the persons account with the ID userID
    const response = await fetch(
      dateValuesRoute,
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
    if (response.ok) {
      try {
        // reverse the date values as most recent should be on the right of the graph
        return ((json.dates).reverse());
      } catch (error) {
        return [0];
      }
    }
  };
  return { getDateValues };
}

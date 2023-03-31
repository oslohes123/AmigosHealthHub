// get the most recent face values and return it when the hook is called
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const faceValuesRoute = `${serverURL}/api/user/mentalHealth/faceGraph`;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialFaceValuesRoute = '/api/user/mentalHealth/faceGraph';
let faceValuesRoute;
if (usingDeployedServer) {
  faceValuesRoute = `${serverURL}${partialFaceValuesRoute}`;
} else {
  faceValuesRoute = `http://${ipAddress}:${port}${partialFaceValuesRoute}`;
}
export default function useGetFaceValues() {
  // get the current users ID thats currently logged in
  const { user } = useAuthContext();
  const userID = user.id;
  const { logout } = useLogout();

  // make a get request to get the most recent 7(max) face values
  const getFaceValues = async () => {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    const response = await fetch(
      faceValuesRoute,
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
        // return the reverse of the face values as most recent should be on the right of the graph
        return (json.faces).reverse();
      } catch (error) {
        return [0];
      }
    }
  };
  return { getFaceValues };
}

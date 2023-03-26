import AsyncStorage from '@react-native-async-storage/async-storage';
import { clientSearchMethods } from '../../../../constants';

const serverURL = process.env.URL;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
// For testing purposes
// Update this with your own UrlService

export async function genericSearch(value) {
  const url = `${serverURL}/api/food/${clientSearchMethods.genericSearch}.${value}`;
  if(!usingDeployedServer) {
    url = `http://${ipAddress}:${port}/api/food/${clientSearchMethods.genericSearch}.${value}`;
  }

  let response;
  try {
    const { token } = JSON.parse(await AsyncStorage.getItem('user'));
    response = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    response = await response.json();
  } catch (error) {
    console.log('Error when getting generic search');
    console.log(error);
    return error;
  }
  return response;
}

export async function specificSearch(value) {
  const url = `${serverURL}/api/food/${clientSearchMethods.specificSearch}.${value}`;
  if(!usingDeployedServer) {
    url = `http://${ipAddress}:${port}/api/food/${clientSearchMethods.specificSearch}.${value}`;
  }
  
  let response;
  try {
    const { token } = JSON.parse(await AsyncStorage.getItem('user'));
    response = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    response = await response.json();
  } catch (error) {
    console.log('Error when getting specific search');
    console.log(error);
    return error;
  }
  return response;
}

// export default function useGetCaloriesBurntToday() {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);
//   const { user } = useAuthContext();
//   const { id, token } = user;
//   const getCaloriesBurntToday = async () => {
//     setIsLoading(true);
//     setError(null);

//     const response = await fetch(getCaloriesBurntTodayRoute, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json', userid: id, authorization: token },
//     });

//     const getCaloriesBurntTodayJSON = await response.json();
//     if (!response.ok) {
//       setIsLoading(false);
//       setError(getCaloriesBurntTodayJSON.mssg);
//       return null;
//     }
//     if (response.ok) {
//       try {
//         setIsLoading(false);
//         return getCaloriesBurntTodayJSON.totalCaloriesBurnt; // this is a single number
//       } catch (caughtError) {
//         setError(caughtError);
//         setIsLoading(false);
//         return null;
//       }
//     }
//   };

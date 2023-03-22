import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clientSearchMethods } from '../../../../constants';

const serverURL = process.env.URL;
// For testing purposes
// Update this with your own UrlService

export async function genericSearch(value) {
  const url = `${serverURL}/api/food/${clientSearchMethods.genericSearch}.${value}`;

  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await axios.get(url, {
      headers: {
        authorization: token,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(`Default error handler${error}`);
    }
    return error;
  }
  return response.data;
}

export async function specificSearch(value) {
  const url = `${serverURL}/api/food/${clientSearchMethods.specificSearch}.${value}`;
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await axios.get(url, {
      headers: {
        authorization: token,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(`Default error handler${error}`);
    }
    return error;
  }

  return response.data;
}

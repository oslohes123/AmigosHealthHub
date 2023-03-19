import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clientSearchMethods } from '../constants';

const portENV = process.env.PORT;
const ipAddressEnv = process.env.ipAddress;
// For testing purposes
// Update this with your own UrlService

export async function genericSearch(value) {
  const url = `http://${ipAddressEnv}:${portENV}/api/food/${clientSearchMethods.genericSearch}.${value}`;

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
<<<<<<< HEAD
    let url= `http://${ipAddress}:${port}/api/food/${clientSearchMethods.specificSearch}.${value}`;
    let response
    try {
        const {token } = JSON.parse(
            (await AsyncStorage.getItem('user'))
        );
        response = await axios.get(url,{
            headers: {
                authorization:token
        }});
    }
    catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response);
        }else{
            console.log("Default error handler" + error);
        }
        return error;
=======
  const url = `http://${ipAddressEnv}:${portENV}/api/food/${clientSearchMethods.specificSearch}.${value}`;
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
>>>>>>> 86833971704515330f9e58f06f98015741e96e07
    }
    return error;
  }

  return response.data;
}

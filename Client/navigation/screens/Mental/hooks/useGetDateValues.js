//Get the date values for the most recent 7 (max) submissions to put into the x-axis of the line graph
const port = process.env["PORT"];
const ipAddress = process.env["ipAddress"];
const serverURL = process.env.URL;
const dateValuesRoute = `${serverURL}/api/user/mentalHealth/dateValues`
import { useAuthContext } from "../../Authentication/context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useGetDateValues = () => {
  
  //get the current users ID thats currently logged in
  const { user } = useAuthContext();
  let userID = user.id
  
  const getDateValues = async () => {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user'))
    );
    //make a get request to get the data of the persons account with the ID userID
    const response = await fetch(
      dateValuesRoute,
      {
        method: "GET",
        headers: {id: userID, authorization: token}
      } 
    );
    const json = await response.json();
    if (!response.ok) {
      return [0]
    }
    if (response.ok) {
      try {
        //return the reverse of the date values as the most recent should be the last value displayed on the right of the graph
        return ((json.dates).reverse());
      } catch (error) {
        return [0]
      }
    }
  };
  return {getDateValues}
}
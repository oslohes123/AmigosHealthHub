//Get the users (thats currently logged in) word of the day
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const todaysWordRoute = `http://${ipAddress}:${port}/api/user/mentalHealth/todaysWord`
console.log(`todaysWordRoute:${todaysWordRoute}`)
import { useAuthContext } from "../../Authentication/context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useGetTodaysWord = () => {
  //get the current users ID thats currently logged in
  const { user } = useAuthContext();
  let userID = user.id
  //make a get request to get the recent word
  const getTodaysWord = async () => {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user'))
    );
    const response = await fetch(
      todaysWordRoute,
      {
        method: "GET",
        headers: {id: userID, authorization: token}
      } 
    );
    const json = await response.json();
    if (!response.ok) {
      return [0]
    }
    //if the response shows there was no error, return the word
    if (response.ok) {
      try {
        return json
      } catch (error) {
        return [0]
      }
    }
  };
  return {getTodaysWord}
}
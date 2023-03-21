//Get the most recent word values to place into the wordcloud
const port = process.env["PORT"];
const ipAddress = process.env["ipAddress"];
const serverURL = process.env.URL;
const wordValuesRoute = `${serverURL}/api/user/mentalHealth/wordcloud`
console.log(`WordValuesRoute:${wordValuesRoute}`)
import { useAuthContext } from "../../Authentication/context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useGetWordValues = () => {
  //get the current users ID thats currently logged in
  const { user } = useAuthContext();
  let userID = user.id
  //make a get request to get the most recent 7(max) word values
  const getWordValues = async () => {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user'))
    );
    const response = await fetch(
      wordValuesRoute,
      {
        method: "GET",
        headers: {id: userID, authorization: token}
      } 
    );
    const json = await response.json();
    if (!response.ok) {
      return [0]
    }
    //if the response shows there was no error, return the words to be provided when the hook is called
    if (response.ok) {
      try {
        return json
      } catch (error) {
        return [0]
      }
    }
  };
  return {getWordValues}
}
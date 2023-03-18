//get the most recent face values and return it when the hook is called
const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];
const faceValuesRoute = `http://${ip_address}:${port}/api/user/mentalHealth/faceGraph`
console.log(`faceValuesRoute:${faceValuesRoute}`)
import { useAuthContext } from "../../Authentication/context/AuthContext";

export const useGetFaceValues = () => {
  //get the current users ID thats currently logged in
  const { user } = useAuthContext();
  let userID = user.id
  //make a get request to get the most recent 7(max) face values
  const getFaceValues = async () => {
    const response = await fetch(
      faceValuesRoute,
      {
        method: "GET",
        headers: {id: userID}
      } 
    );
    const json = await response.json();
    if (!response.ok) {
      return [0]
    }
    if (response.ok) {
      
      try {
        //return the reverse of the face values as the most recent should be the last value displayed on the right of the graph
        return (json.faces).reverse();
      } catch (error) {
        return [0]
      }
    }
  };
  return {getFaceValues}
}
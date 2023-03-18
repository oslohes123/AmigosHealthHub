const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];
const dateValuesRoute = `http://${ip_address}:${port}/api/user/mentalHealth/dateValues`
import { useAuthContext } from "../../Authentication/context/AuthContext";

export const useGetDateValues = () => {
  const { user } = useAuthContext();
  let userID = user.id
const getDateValues = async () => {
    const response = await fetch(
      dateValuesRoute,
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
        return ((json.dates).reverse());
      } catch (error) {
        return [0]
      }
    }
  };
  return {getDateValues}
}
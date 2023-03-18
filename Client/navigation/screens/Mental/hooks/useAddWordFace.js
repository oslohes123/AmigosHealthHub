//Hook to be called when submit button is pressed to send request to route to add data to supabase
import { useAuthContext } from "../../Authentication/context/AuthContext";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];

export const useSubmit = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  //get the current users ID thats currently logged in
  const { user } = useAuthContext();
  let id = user.id

  const submit = async (face, word) => {
    setIsLoading(true);
    setError(null);
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user'))
    );
    //make a post request with the data and the accountID the data should be sent with respect to 
    const response = await fetch(
      `http://${ip_address}:${port}/api/user/mentalHealth/rateMental`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json",
        authorization: token
      },
        body: JSON.stringify({ id, face, word }),
      }
    );
    //get the response and test if it returns an ok or error response
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.mssg);
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        setError(json.mssg)
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  };
  return { submit, isLoading, error }
};
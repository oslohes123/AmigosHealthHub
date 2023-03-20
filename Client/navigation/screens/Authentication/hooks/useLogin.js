import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const loginRoute =  `http://${ipAddress}:${port}/api/user/login`;
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  console.log(`port: ${port}`);
  console.log(`ipAddress: ${ipAddress}`);
  console.log(JSON.stringify(process.env));

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    console.log("In login");
    console.log(`Port in login: ${port}`);
    console.log(`ipAddress in login: ${ipAddress}`);

    const response = await fetch(
     loginRoute,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.mssg);
      console.log(error);
    }
    if (response.ok) {
      try {
        //sets user properties from API to 'user' in AsyncStorage, so it can 'remember' a user
        await AsyncStorage.setItem("user", JSON.stringify(json));
        console.log(json);

        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return { login, isLoading, error };
};

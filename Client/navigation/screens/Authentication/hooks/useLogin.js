import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_IP_ADDRESS, REACT_APP_PORT } from "@env";
// const dotenv = require("dotenv");
// dotenv.config();
// const port = process.env["PORT"];
// const ip_address = process.env["IP_ADDRESS"];
const port = REACT_APP_PORT;
const ip_address = REACT_APP_IP_ADDRESS;
// console.log(`process.env.REACT_APP_PORT: ${process.env.REACT_APP_PORT}`);
// console.log(
//   `process.env.REACT_APP_IP_ADDRESS: ${process.env.REACT_APP_IP_ADDRESS}`
// );
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  console.log(`port: ${port}`);
  console.log(`ip_address: ${ip_address}`);
  console.log(JSON.stringify(process.env));
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    console.log("In login");
    console.log(`Port in login: ${port}`);
    console.log(`ip_address in login: ${ip_address}`);

    const response = await fetch(
      `http://${ip_address}:${port}/api/user/login`,
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

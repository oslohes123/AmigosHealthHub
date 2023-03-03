import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const dotenv = require("dotenv");
// dotenv.config();
const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

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
        //sets email and jwtToken from API to 'user' in AsyncStorage
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

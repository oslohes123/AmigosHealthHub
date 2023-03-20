import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const signUpRoute  = `http://${ipAddress}:${port}/api/user/sign_up`
export const useSignUp = () => {
  console.log(`port in sign up: ${port}`);
  console.log(`ipAddress in sign up: ${ipAddress}`);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  console.log("In useSignUp");
  const signup = async (email, firstName, lastName, age, password) => {
    setIsLoading(true);
    setError(null);
    console.log("In signup");
    console.log(
      `body: ${JSON.stringify({ email, firstName, lastName, age, password })}`
    );
    console.log(`http://${ipAddress}:${port}/api/user/sign_up`);
    const response = await fetch(
      signUpRoute,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, age, password }),
      }
    );

    // const response = await fetch(`http://192.168.0.17:3001/api/user/sign_up`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({"email":"sadasds23ad@gmail.com","firstName":"asdasdsad","lastName":"asdasdsadsa","age":"23","password":"Password123!"})
    // })

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.mssg);
      console.log(error);
    }
    if (response.ok) {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return { signup, isLoading, error };
};

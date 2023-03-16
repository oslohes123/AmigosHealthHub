import { useState } from "react";
import { IP_ADDRESS, PORT } from "@env";
const port = PORT;
const ip_address = IP_ADDRESS;
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const getCaloriesBurntTodayRoute = `http://${ip_address}:${port}/api/user/workout/calories/getToday`;

export const useGetCaloriesBurntToday = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;

  const getCaloriesBurntToday = async () => {
    setIsLoading(true);
    setError(null);

    console.log("In getCaloriesBurntToday");
    // console.log(`Port in searchExercise: ${port}`);
    // console.log(`ip_address in searchExercise: ${ip_address}`);

    const response = await fetch(getCaloriesBurntTodayRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid },
    });

    const getCaloriesBurntTodayJSON = await response.json();
    console.log(
      `getCaloriesBurntTodayJSON: ${JSON.stringify(getCaloriesBurntTodayJSON)}`
    );
    if (!response.ok) {
      setIsLoading(false);
      setError(getCaloriesBurntTodayJSON.mssg);
      console.log(error);
      return null;
    }
    if (response.ok) {
      try {
        // console.log(`getCaloriesBurntTodayJSON: ${JSON.stringify(getCaloriesBurntTodayJSON)}`);
        setIsLoading(false);
        return getCaloriesBurntTodayJSON.totalCaloriesBurnt; //this is a single number
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return null;
      }
    }
  };

  return { getCaloriesBurntToday, isLoading, error };
};

import { useState } from "react";
import { IP_ADDRESS, PORT } from "@env";
const port = PORT;
const ip_address = IP_ADDRESS;
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const getAllWorkoutNamesRoute = `http://${ip_address}:${port}/api/user/workout/getAllWorkoutNames`;

export const useGetAllWorkoutNames = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;
  // const { dispatch } = useAuthContext();

  const getAllWorkoutNames = async () => {
    setIsLoading(true);
    setError(null);

    console.log("In getAllWorkoutNames");
    // console.log(`Port in searchExercise: ${port}`);
    // console.log(`ip_address in searchExercise: ${ip_address}`);

    const response = await fetch(getAllWorkoutNamesRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid },
    });

    const getAllWorkoutNamesJSON = await response.json();
    console.log(getAllWorkoutNamesJSON);
    if (!response.ok) {
      setIsLoading(false);
      setError(getAllWorkoutNamesJSON.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        console.log(getAllWorkoutNamesJSON);
        setIsLoading(false);
        return getAllWorkoutNamesJSON.arrayOfAllWorkouts; //this is an array containing all workout names
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return [];
      }
    }
  };

  return { getAllWorkoutNames, isLoading, error };
};

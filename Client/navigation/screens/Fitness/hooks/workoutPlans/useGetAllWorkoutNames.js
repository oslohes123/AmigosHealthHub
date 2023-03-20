import { useState } from "react";
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const getAllWorkoutNamesRoute = `http://${ipAddress}:${port}/api/user/workout/getAllWorkoutNames`;

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
    // console.log(`ipAddress in searchExercise: ${ipAddress}`);

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

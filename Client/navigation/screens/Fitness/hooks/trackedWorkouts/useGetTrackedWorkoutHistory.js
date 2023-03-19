import { useState } from "react";
import { ipAddress, PORT } from "@env";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = PORT;
const ipAddress = ipAddress;
const getWorkoutHistoryRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/getAll`;

export const useGetWorkoutHistory = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const userid = user.id;
  const getWorkoutHistory = async () => {
    setIsLoading(true);
    setError(null);

    console.log("In getWorkoutHistory");

    const response = await fetch(getWorkoutHistoryRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid },
    });

    const getWorkoutHistoryJSON = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(getWorkoutHistoryJSON.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        console.log(getWorkoutHistoryJSON);
        setIsLoading(false);
        return getWorkoutHistoryJSON.workoutsNamesAndDates; //this is an object containing information about properties of the exercise
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return [];
      }
    }
  };

  return { getWorkoutHistory, isLoading, error };
};

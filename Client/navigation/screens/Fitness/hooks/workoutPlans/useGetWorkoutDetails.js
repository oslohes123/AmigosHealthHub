import { useState } from "react";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getWorkoutDetailsRoute = `http://${ipAddress}:${port}/api/user/workout/get`;

export const useGetWorkoutDetails = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;
  console.log(`userid ln13 getworkoutdetails: ${userid}`);

  const getWorkoutDetails = async (workoutname) => {
    setIsLoading(true);
    setError(null);

    console.log("In useGetWorkoutDetails");
    // console.log(`Port in searchExercise: ${port}`);
    // console.log(`ipAddress in searchExercise: ${ipAddress}`);

    const response = await fetch(getWorkoutDetailsRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid, workoutname },
    });

    const getWorkoutDetailsJSON = await response.json();
    console.log(getWorkoutDetailsJSON);
    if (!response.ok) {
      setIsLoading(false);
      setError(getWorkoutDetailsJSON.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        console.log(getWorkoutDetailsJSON);
        setIsLoading(false);
        return getWorkoutDetailsJSON.workoutToReturn; //this is an array
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return [];
      }
    }
  };

  return { getWorkoutDetails, isLoading, error };
};

import { useState } from "react";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getTrackedWorkoutDetailsRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/get`;

export const useGetTrackedWorkoutDetails = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;
  console.log(`userid ln13 useGetTrackedWorkoutDetails: ${userid}`);

  //Parameters: workout, date and time.
  const getTrackedWorkoutDetails = async (workoutname, date, time) => {
    setIsLoading(true);
    setError(null);

    console.log("In useGetTrackedWorkoutDetails");

    const response = await fetch(getTrackedWorkoutDetailsRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid,
        workoutname,
        date,
        time,
      },
    });

    const getTrackedWorkoutDetailsJSON = await response.json();
    console.log(getTrackedWorkoutDetailsJSON);
    if (!response.ok) {
      setIsLoading(false);
      setError(getTrackedWorkoutDetailsJSON.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        console.log(getTrackedWorkoutDetailsJSON);
        setIsLoading(false);
        return getTrackedWorkoutDetailsJSON.workoutToReturn; //this is an array
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return [];
      }
    }
  };

  return { getTrackedWorkoutDetails, isLoading, error };
};

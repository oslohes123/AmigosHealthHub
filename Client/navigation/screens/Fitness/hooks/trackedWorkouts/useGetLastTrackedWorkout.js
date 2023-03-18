import { useState } from "react";
import { IP_ADDRESS, PORT } from "@env";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = PORT;
const ip_address = IP_ADDRESS;
const getLastTrackedWorkoutRoute = `http://${ip_address}:${port}/api/user/completedWorkouts/lastTrackedWorkout`;

export const useGetLastTrackedWorkout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const userid = user.id;
  const getLastTrackedWorkout = async () => {
    setIsLoading(true);
    setError(null);

    console.log("In getWorkoutHistory");

    const response = await fetch(getLastTrackedWorkoutRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid },
    });

    const getLastTrackedWorkoutJSON = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(getLastTrackedWorkoutJSON.mssg);
      console.log(error);
      return "Not Available";
    }
    if (response.ok) {
      try {
        console.log(getLastTrackedWorkoutJSON);
        setIsLoading(false);
        return getLastTrackedWorkoutJSON.lastTrackedWorkout;
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return "Not Available";
      }
    }
  };

  return { getLastTrackedWorkout, isLoading, error };
};

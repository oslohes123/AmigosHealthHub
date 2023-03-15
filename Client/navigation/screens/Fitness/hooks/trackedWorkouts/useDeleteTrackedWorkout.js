import { useState } from "react";
import { IP_ADDRESS, PORT } from "@env";
const port = PORT;
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const ip_address = IP_ADDRESS;
const deleteTrackedWorkoutRoute = `http://${ip_address}:${port}/api/user/completedWorkouts/delete`;

export const useDeleteTrackedWorkout = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;
  console.log(`userid ln13 useDeleteTrackedWorkout: ${userid}`);

  //Parameters: workoutname, date(format: 2023-03-15), time(format: 00:12:02)
  const deleteTrackedWorkout = async (workoutname, date, time) => {
    setIsLoading(true);
    setError(null);

    console.log("In useDeleteWorkoutPlan");

    const response = await fetch(deleteTrackedWorkoutRoute, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, workoutname, date, time }),
    });

    const deleteTrackedWorkoutJSON = await response.json();
    console.log(
      `deleteTrackedWorkoutJSON: ${JSON.stringify(deleteTrackedWorkoutJSON)}`
    );
    if (!response.ok) {
      setIsLoading(false);
      setError(deleteTrackedWorkoutJSON.mssg);
      console.log(error);
    }
    if (response.ok) {
      try {
        console.log(
          `deleteTrackedWorkoutJSON SUCCESS: ${JSON.stringify(
            deleteTrackedWorkoutJSON
          )}`
        );
        setSuccess(deleteTrackedWorkoutJSON.mssg);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return { deleteTrackedWorkout, isLoading, error, success };
};

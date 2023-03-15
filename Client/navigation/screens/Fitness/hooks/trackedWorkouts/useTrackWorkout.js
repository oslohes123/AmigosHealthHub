import { useState } from "react";
import { REACT_APP_IP_ADDRESS, REACT_APP_PORT } from "@env";
const port = REACT_APP_PORT;
const ip_address = REACT_APP_IP_ADDRESS;
const trackWorkoutRoute = `http://${ip_address}:${port}/api/user/completedWorkouts/add`;
import { useAuthContext } from "../../../Authentication/context/AuthContext";

/**
 *
 * @returns message state that displays either error or success message
 */
export const useTrackWorkout = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const userid = user.id;

  const trackWorkout = async (workoutname, exercises) => {
    setIsLoading(true);
    setMessage(null);

    console.log("In addCompletedWorkout");

    const response = await fetch(trackWorkoutRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid, workoutname, exercises }),
    });

    const trackWorkoutJSON = await response.json();
    console.log(`trackWorkoutJSON: ${JSON.stringify(trackWorkoutJSON)}`);
    if (!response.ok) {
      setIsLoading(false);
      setMessage(trackWorkoutJSON.mssg);
      console.log(message);
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        setMessage(trackWorkoutJSON.mssg);
      } catch (error) {
        setMessage(error);
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return { trackWorkout, isLoading, message };
};

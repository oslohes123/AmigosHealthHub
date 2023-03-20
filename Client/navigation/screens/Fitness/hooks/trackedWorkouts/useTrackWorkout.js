import { useState } from "react";
import { ipAddress, PORT } from "@env";
// const port = PORT;
// const ipAddress = ipAddress;
const trackWorkoutRoute = `http://${ipAddress}:${PORT}/api/user/completedWorkouts/add`;
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

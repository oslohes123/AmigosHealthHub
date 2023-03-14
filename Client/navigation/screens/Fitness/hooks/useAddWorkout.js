import { useState } from "react";
import { REACT_APP_IP_ADDRESS, REACT_APP_PORT } from "@env";
const port = REACT_APP_PORT;
const ip_address = REACT_APP_IP_ADDRESS;
const addWorkoutRoute = `http://${ip_address}:${port}/api/user/workout/add`;
import { useAuthContext } from "../../Authentication/context/AuthContext";

/**
 *
 * @returns message state that displays either error or success message
 */
export const useAddWorkout = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const userid = user.id;
  //exercises is an array eg. exercises": [
  //     {
  //         "userID": "e9eae359-87cc-482c-8b08-0c4ce7d32c01",
  //         "exerciseID": "78491fbb-818b-4f85-ac0a-592fbcfb0b2e",
  //         "sets": 3,
  //         "reps":12,
  //         "calories":50
  //     },
  //     {
  //         "userID": "e9eae359-87cc-482c-8b08-0c4ce7d32c01",
  //         "exerciseID": "5681d626-faee-4277-be34-3346696433e6",
  //         "sets": 3,
  //         "reps":12,
  //         "calories":50
  //     }
  // ]

  const addWorkout = async (workoutname, exercises) => {
    setIsLoading(true);
    setMessage(null);

    console.log("In addWorkout");

    const response = await fetch(addWorkoutRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid, workoutname, exercises }),
    });

    const addWorkoutJSON = await response.json();
    console.log(addWorkoutJSON);
    if (!response.ok) {
      setIsLoading(false);
      setMessage(addWorkoutJSON.mssg);
      console.log(message);
    }
    if (response.ok) {
      try {
        console.log(addWorkoutJSON);
        setIsLoading(false);
        setMessage(addWorkoutJSON.mssg);
      } catch (error) {
        setMessage(error);
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return { addWorkout, isLoading, message };
};

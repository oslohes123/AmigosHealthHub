import { useState } from "react";
import { REACT_APP_IP_ADDRESS, REACT_APP_PORT } from "@env";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = REACT_APP_PORT;
const ip_address = REACT_APP_IP_ADDRESS;
const addExerciseToExercisesRoute = `http://${ip_address}:${port}/api/user/exercise/add`;

export const useAddExerciseToExercises = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  userid = user.id;

  const addExerciseToExercises = async (
    type,
    name,
    muscle,
    difficulty,
    instructions,
    equipment
  ) => {
    setIsLoading(true);
    setError(null);

    console.log("In addExerciseToExercises");

    const response = await fetch(addExerciseToExercisesRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json", userid },
      body: JSON.stringify({
        type,
        name,
        muscle,
        difficulty,
        instructions,
        equipment,
      }),
    });

    const addExerciseToExercisesJSON = await response.json();
    console.log(addExerciseToExercisesJSON);
    if (!response.ok) {
      setIsLoading(false);
      setError(addExerciseToExercisesJSON.mssg);
      console.log(error);
      return null;
    }
    if (response.ok) {
      try {
        console.log(addExerciseToExercisesJSON);
        setIsLoading(false);
        return addExerciseToExercisesJSON.exerciseID; //this is an array containing all workout names
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return null;
      }
    }
  };

  return { addExerciseToExercises, isLoading, error };
};

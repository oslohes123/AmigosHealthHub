import { useState } from "react";
import { ipAddress, PORT } from "@env";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
// const port = PORT;
// const ipAddress = ipAddress;
const getAllExercisesRoute = `http://${ipAddress}:${PORT}/api/user/exercise/getAll`;

export const useGetAllExercises = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;

  const getAllExercises = async () => {
    setIsLoading(true);
    setError(null);

    console.log("In getAllExercises");

    const response = await fetch(getAllExercisesRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid },
    });

    const getAllExercisesJSON = await response.json();
    console.log(`getAllExercisesJSON: ${JSON.stringify(getAllExercisesJSON)}`);
    if (!response.ok) {
      setIsLoading(false);
      setError(getAllExercisesJSON.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        console.log(getAllExercisesJSON);
        setIsLoading(false);
        return getAllExercisesJSON.arrayOfExerciseNames;
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return [];
      }
    }
  };

  return { getAllExercises, isLoading, error };
};

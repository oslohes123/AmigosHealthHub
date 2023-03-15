import { useState } from "react";
import { IP_ADDRESS, PORT } from "@env";
const port = PORT;
const ip_address = IP_ADDRESS;
const getExerciseByNameRoute = `http://${ip_address}:${port}/api/user/exercise/get`;

export const useGetExerciseByName = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();

  const getExerciseByName = async (exercisename) => {
    setIsLoading(true);
    setError(null);

    console.log("In getExerciseByName");
    // console.log(`Port in searchExercise: ${port}`);
    // console.log(`ip_address in searchExercise: ${ip_address}`);

    const response = await fetch(getExerciseByNameRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", exercisename },
    });

    const getExerciseByNameJSON = await response.json();
    // console.log(getExerciseByNameJSON);
    if (!response.ok) {
      setIsLoading(false);
      setError(getExerciseByNameJSON.mssg);
      console.log(error);
      return null;
    }
    if (response.ok) {
      try {
        console.log(getExerciseByNameJSON);
        setIsLoading(false);
        return getExerciseByNameJSON.exerciseInformation; //this is an object containing information about properties of the exercise
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return null;
      }
    }
  };

  return { getExerciseByName, isLoading, error };
};

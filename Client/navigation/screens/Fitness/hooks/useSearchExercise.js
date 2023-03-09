import { useState } from "react";
import { REACT_APP_IP_ADDRESS, REACT_APP_PORT } from "@env";
const port = REACT_APP_PORT;
const ip_address = REACT_APP_IP_ADDRESS;
const searchExerciseRoute = `http://${ip_address}:${port}/api/user/exercise/search`;

export const useSearchExercise = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();

  const searchExercise = async (wordToSearch) => {
    setIsLoading(true);
    setError(null);

    console.log("In searchExercise");
    // console.log(`Port in searchExercise: ${port}`);
    // console.log(`ip_address in searchExercise: ${ip_address}`);

    const response = await fetch(searchExerciseRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", wordToSearch },
    });

    const searchedExercisesJson = await response.json();
    console.log(searchedExercisesJson);
    if (!response.ok) {
      setIsLoading(false);
      setError(searchedExercisesJson.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        console.log(searchedExercisesJson);
        setIsLoading(false);
        return searchedExercisesJson.searchedWords; //this is the array of exercises, look at postman
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return { searchExercise, isLoading, error };
};

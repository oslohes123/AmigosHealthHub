import { useState } from "react";
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const searchExerciseRoute = `http://${ipAddress}:${port}/api/user/exercise/search`;

export const useSearchExercise = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();

  const searchExercise = async (wordToSearch) => {
    setIsLoading(true);
    setError(null);

    console.log("In searchExercise");
    // console.log(`Port in searchExercise: ${port}`);
    // console.log(`ipAddress in searchExercise: ${ipAddress}`);

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

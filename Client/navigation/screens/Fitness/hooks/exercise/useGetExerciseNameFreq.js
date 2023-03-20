import { useState } from "react";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getExerciseNameFreqRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/exerciseNameFreq`;

export const useGetExerciseNameFreq = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const userid = user.id;

  const getExerciseNameFreq = async () => {
    setIsLoading(true);
    setError(null);

    console.log("In getExerciseFreq");

    const response = await fetch(getExerciseNameFreqRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid },
    });

    const getExerciseNameFreqJSON = await response.json();
    console.log(`getExerciseNameFreqJSON: ${JSON.stringify(getExerciseNameFreqJSON)}`);
    if (!response.ok) {
      setIsLoading(false);
      setError(getExerciseNameFreqJSON.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return{
           exerciseNameLabels: getExerciseNameFreqJSON.graphLabels,
           exerciseNameData: getExerciseNameFreqJSON.graphData
        }   
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return [];
      }
    }
  };

  return { getExerciseNameFreq, isLoading, error };
};

import { useState } from "react";
import { IP_ADDRESS, PORT } from "@env";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = PORT;
const ip_address = IP_ADDRESS;
const getExerciseNameTypeRoute = `http://${ip_address}:${port}/api/user/completedWorkouts/exerciseTypeFreq`;

export const useGetExerciseTypeFreq = () => {
  const [getErrorGetExerciseType, setErrorGetExerciseType] = useState(null);
  const [isLoadingExerciseType, setIsLoadingExerciseType] = useState(null);
 
  const { user } = useAuthContext();
  const userid = user.id;

  const getExerciseTypeFreq = async () => {
    setIsLoadingExerciseType(true);
    setErrorGetExerciseType(null);

    console.log("In getExerciseTypeFreq");

    const response = await fetch(getExerciseNameTypeRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid },
    });

    const getExerciseTypeFreqJSON = await response.json();
    console.log(`getExerciseTypeFreqJSON: ${JSON.stringify(getExerciseTypeFreqJSON)}`);
    if (!response.ok) {
        setIsLoadingExerciseType(false);
        setErrorGetExerciseType(getExerciseTypeFreqJSON.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoadingExerciseType(false);
        return{
           exerciseTypeLabels: getExerciseTypeFreqJSON.graphLabels,
           exerciseTypeData: getExerciseTypeFreqJSON.graphData
        }   
      } catch (error) {
        setErrorGetExerciseType(error);
        setIsLoadingExerciseType(false);
        console.error(error);
        return [];
      }
    }
  };

  return { getExerciseTypeFreq, isLoadingExerciseType, getErrorGetExerciseType };
};

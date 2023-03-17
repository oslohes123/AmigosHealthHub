import { useState } from "react";
import { IP_ADDRESS, PORT } from "@env";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = PORT;
const ip_address = IP_ADDRESS;
const workoutFreqRoute = `http://${ip_address}:${port}/api/user/completedWorkouts/workoutFreq`;

export const useTrackedWorkoutFreq = () => {
  const [getErrorGetWorkoutFreq, setErrorGetWorkoutFreq] = useState(null);
  const [isLoadingGetWorkoutFreq, setIsLoadingGetWorkoutFreq] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;

  const getTrackedWorkoutFreq = async () => {
    setIsLoadingGetWorkoutFreq(true);
    setErrorGetWorkoutFreq(null);

    console.log("In getWorkoutFreq");

    const response = await fetch(workoutFreqRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid },
    });

    const getTrackedWorkoutFreqJSON = await response.json();
    console.log(`getTrackedWorkoutFreqJSON: ${JSON.stringify(getTrackedWorkoutFreqJSON)}`);
    if (!response.ok) {
        setIsLoadingGetWorkoutFreq(false);
      setErrorGetWorkoutFreq(getTrackedWorkoutFreqJSON.mssg);
      console.log(getErrorGetWorkoutFreq);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoadingGetWorkoutFreq(false);
        return{
           workoutNameLabels: getTrackedWorkoutFreqJSON.graphLabels,
           workoutNameData: getTrackedWorkoutFreqJSON.graphData
        }   
      } catch (error) {
        setErrorGetWorkoutFreq(error);
        setIsLoadingGetWorkoutFreq(false);
        console.error(getErrorGetWorkoutFreq);
        return [];
      }
    }
  };

  return { getTrackedWorkoutFreq, isLoadingGetWorkoutFreq, getErrorGetWorkoutFreq };
};

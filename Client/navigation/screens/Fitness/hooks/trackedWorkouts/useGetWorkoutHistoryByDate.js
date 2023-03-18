import { useState } from "react";
import { IP_ADDRESS, PORT } from "@env";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = PORT;
const ip_address = IP_ADDRESS;
const getWorkoutHistoryByDateRoute = `http://${ip_address}:${port}/api/user/completedWorkouts/workoutHistoryByDate`;

export const useGetWorkoutHistoryByDate = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const userid = user.id;
  const getWorkoutHistoryByDate = async (date) => {
    setIsLoading(true);
    setError(null);

    console.log("In getWorkoutHistoryByDate");

    const response = await fetch(getWorkoutHistoryByDateRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid, date },
    });

    const getWorkoutHistoryByDateJSON = await response.json();
    console.log(`getWorkoutHistoryByDateJSON: ${JSON.stringify(getWorkoutHistoryByDateJSON)}`);
    if (!response.ok) {
      setIsLoading(false);
      setError(getWorkoutHistoryByDateJSON.mssg);
      console.log(error);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return {
          arrayOfWorkoutNamesAndIDs: getWorkoutHistoryByDateJSON.arrayOfWorkoutNamesAndIDs,
            graphLabels: getWorkoutHistoryByDateJSON.graphLabels,
            graphData: getWorkoutHistoryByDateJSON.graphData
        }
        ; 
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return [];
      }
    }
  };

  return { getWorkoutHistoryByDate, isLoading, error };
};

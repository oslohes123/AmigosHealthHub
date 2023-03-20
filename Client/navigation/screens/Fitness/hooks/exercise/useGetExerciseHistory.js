import { useState } from "react";
import { ipAddress, PORT } from "@env";
// const port = PORT;
// const ipAddress = ipAddress;
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const getExerciseHistoryRoute = `http://${ipAddress}:${PORT}/api/user/exercise/history`;

export const useGetExerciseHistory = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;

  const getExerciseHistory = async (nameofexercise) => {
    setIsLoading(true);
    setError(null);

    console.log("In getExerciseHistory");

    const response = await fetch(getExerciseHistoryRoute, {
      method: "GET",
      headers: { "Content-Type": "application/json", userid, nameofexercise },
    });

    const getExerciseHistoryJSON = await response.json();
    console.log(
      `getExerciseHistoryJSON: ${JSON.stringify(getExerciseHistoryJSON)}`
    );
    if (!response.ok) {
      setIsLoading(false);
      setError(getExerciseHistoryJSON.mssg);
      console.log(error);
      return null;
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return {
          labels: getExerciseHistoryJSON.arrayOfDates,
          data: getExerciseHistoryJSON.data,
          type: getExerciseHistoryJSON.type,
        };
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
        return null;
      }
    }
  };

  return { getExerciseHistory, isLoading, error };
};

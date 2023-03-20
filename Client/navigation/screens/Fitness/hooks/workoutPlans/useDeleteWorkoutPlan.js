import { useState } from "react";
import { useAuthContext } from "../../../Authentication/context/AuthContext";
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getTrackedWorkoutDetailsRoute = `http://${ipAddress}:${port}/api/user/workout/delete`;

export const useDeleteWorkoutPlan = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const userid = user.id;
  console.log(`userid ln13 useDeleteWorkoutPlan: ${userid}`);

  //Parameters: workoutname.
  const deleteWorkoutPlan = async (workoutname) => {
    setIsLoading(true);
    setError(null);

    console.log("In useDeleteWorkoutPlan");

    const response = await fetch(getTrackedWorkoutDetailsRoute, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, workoutname }),
    });

    const useDeleteWorkoutPlanJSON = await response.json();
    console.log(
      `delete workout json output: ${JSON.stringify(useDeleteWorkoutPlanJSON)}`
    );
    if (!response.ok) {
      setIsLoading(false);
      setError(useDeleteWorkoutPlanJSON.mssg);
      console.log(`delete plan error: ${error}`);
    }
    if (response.ok) {
      try {
        console.log(useDeleteWorkoutPlanJSON);
        setSuccess(useDeleteWorkoutPlanJSON.mssg);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return { deleteWorkoutPlan, isLoading, error, success };
};

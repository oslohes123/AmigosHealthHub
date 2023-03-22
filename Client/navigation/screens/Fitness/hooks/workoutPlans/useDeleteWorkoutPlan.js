import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
const getTrackedWorkoutDetailsRoute = `${serverURL}/api/user/workout/delete`;

export default function useDeleteWorkoutPlan() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;

  // Parameters: workoutname.
  const deleteWorkoutPlan = async (workoutname) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(getTrackedWorkoutDetailsRoute, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ userid: id, workoutname }),
    });

    const useDeleteWorkoutPlanJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(useDeleteWorkoutPlanJSON.mssg);
    }
    if (response.ok) {
      try {
        setSuccess(useDeleteWorkoutPlanJSON.mssg);
        setIsLoading(false);
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
      }
    }
  };

  return {
    deleteWorkoutPlan, isLoading, error, success,
  };
}

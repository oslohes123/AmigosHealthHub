import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
const deleteTrackedWorkoutRoute = `${serverURL}/api/user/completedWorkouts/delete`;

export default function useDeleteTrackedWorkout() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  // Parameters: workoutname, date(format: 2023-03-15), time(format: 00:12:02)
  const deleteTrackedWorkout = async (workoutname, date, time) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(deleteTrackedWorkoutRoute, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        userid: id, workoutname, date, time,
      }),
    });

    const deleteTrackedWorkoutJSON = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(deleteTrackedWorkoutJSON.mssg);
    }
    if (response.ok) {
      try {
        setSuccess(deleteTrackedWorkoutJSON.mssg);
        setIsLoading(false);
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
      }
    }
  };

  return {
    deleteTrackedWorkout, isLoading, error, success,
  };
}

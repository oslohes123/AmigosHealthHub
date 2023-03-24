import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const deleteTrackedWorkoutRoute = `${serverURL}/api/user/completedWorkouts/delete`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialDeleteTrackedWorkoutRoute = '/api/user/completedWorkouts/delete';
let deleteTrackedWorkoutRoute;
if (usingDeployedServer) {
  deleteTrackedWorkoutRoute = `${serverURL}${partialDeleteTrackedWorkoutRoute}`;
} else {
  deleteTrackedWorkoutRoute = `http://localhost:3001${partialDeleteTrackedWorkoutRoute}`;
}
export default function useDeleteTrackedWorkout() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
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
      if (response.status === 401) { logout(); }
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

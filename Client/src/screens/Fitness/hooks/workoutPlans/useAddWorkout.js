import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const addWorkoutRoute = `${serverURL}/api/user/workout/add`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialAddWorkoutRoute = '/api/user/workout/add';
let addWorkoutRoute;
if (usingDeployedServer) {
  addWorkoutRoute = `${serverURL}${partialAddWorkoutRoute}`;
} else {
  addWorkoutRoute = `http://${ipAddress}:${port}${partialAddWorkoutRoute}`;
}
/**
 *
 * @returns message state that displays either error or success message
 */
export default function useAddWorkout() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const addWorkout = async (workoutname, exercises) => {
    setIsLoading(true);
    setMessage(null);
    const response = await fetch(addWorkoutRoute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ userid: id, workoutname, exercises }),
    });

    const addWorkoutJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setMessage(addWorkoutJSON.mssg);
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        setMessage(addWorkoutJSON.mssg);
      } catch (error) {
        setMessage(error);
        setIsLoading(false);
      }
    }
  };

  return { addWorkout, isLoading, message };
}

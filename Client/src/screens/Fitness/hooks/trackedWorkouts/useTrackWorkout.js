import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
// const trackWorkoutRoute = `${serverURL}/api/user/completedWorkouts/add`;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialTrackWorkoutRoute = '/api/user/completedWorkouts/add';
let trackWorkoutRoute;
if (usingDeployedServer) {
  trackWorkoutRoute = `${serverURL}${partialTrackWorkoutRoute}`;
} else {
  trackWorkoutRoute = `http://${ipAddress}:${port}${partialTrackWorkoutRoute}`;
}
/**
 *
 * @returns message state that displays either error or success message
 */
export default function useTrackWorkout() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const { id, token } = user;
  const { logout } = useLogout();
  const trackWorkout = async (workoutname, exercises) => {
    setIsLoading(true);
    setMessage(null);

    const response = await fetch(trackWorkoutRoute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ userid: id, workoutname, exercises }),
    });

    const trackWorkoutJSON = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setMessage(trackWorkoutJSON.mssg);
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        setMessage(trackWorkoutJSON.mssg);
      } catch (caughtError) {
        setMessage(caughtError);
        setIsLoading(false);
      }
    }
  };

  return { trackWorkout, isLoading, message };
}

import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const trackWorkoutRoute = `http://${ipAddress}:${port}/api/user/completedWorkouts/add`;

/**
 *
 * @returns message state that displays either error or success message
 */
export default function useTrackWorkout() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const userid = user.id;

  const trackWorkout = async (workoutname, exercises) => {
    setIsLoading(true);
    setMessage(null);

    const response = await fetch(trackWorkoutRoute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid, workoutname, exercises }),
    });

    const trackWorkoutJSON = await response.json();
    if (!response.ok) {
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

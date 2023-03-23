import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
const trackWorkoutRoute = `${serverURL}/api/user/completedWorkouts/add`;

/**
 *
 * @returns message state that displays either error or success message
 */
export default function useTrackWorkout() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const { id, token } = user;

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

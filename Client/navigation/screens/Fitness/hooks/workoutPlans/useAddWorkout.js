import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';

const serverURL = process.env.URL;
const addWorkoutRoute = `${serverURL}/api/user/workout/add`;

/**
 *
 * @returns message state that displays either error or success message
 */
export default function useAddWorkout() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const { id, token } = user;
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

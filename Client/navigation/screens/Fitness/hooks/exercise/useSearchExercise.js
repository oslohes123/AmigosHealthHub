/* eslint-disable consistent-return */
import { useState } from 'react';
import { useAuthContext } from '../../../Authentication/context/AuthContext';
import { useLogout } from '../../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
// const searchExerciseRoute = `${serverURL}/api/user/exercise/search`;

const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialSearchExerciseRoute = '/api/user/exercise/search';
let searchExerciseRoute;
if (usingDeployedServer) {
  searchExerciseRoute = `${serverURL}${partialSearchExerciseRoute}`;
} else {
  searchExerciseRoute = `http://localhost:3001${partialSearchExerciseRoute}`;
}

export default function useSearchExercise() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const { token } = user;
  const { logout } = useLogout();
  const searchExercise = async (wordToSearch) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(searchExerciseRoute, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', wordToSearch, Authorization: token },
    });

    const searchedExercisesJson = await response.json();
    if (!response.ok) {
      if (response.status === 401) { logout(); }
      setIsLoading(false);
      setError(searchedExercisesJson.mssg);
      return [];
    }
    if (response.ok) {
      try {
        setIsLoading(false);
        return searchedExercisesJson.searchedWords;
      } catch (caughtError) {
        setError(caughtError);
        setIsLoading(false);
      }
    }
  };

  return { searchExercise, isLoading, error };
}

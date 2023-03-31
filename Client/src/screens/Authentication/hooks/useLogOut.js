import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/AuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    // remove user from storage
    await AsyncStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};

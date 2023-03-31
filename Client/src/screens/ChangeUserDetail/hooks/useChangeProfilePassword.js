import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';

const serverURL = process.env.URL;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const partialChangePasswordRoute = '/api/user/changeProfileDetails/password';
let changePasswordRoute;
if (usingDeployedServer) {
  changePasswordRoute = `${serverURL}${partialChangePasswordRoute}`;
} else {
  changePasswordRoute = `http://${ipAddress}:${port}${partialChangePasswordRoute}`;
}
export default function useChangeProfilePassword() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  console.log('In changePassword');

  const changePassword = async (old_password, new_password) => {
    setIsLoading(true);
    setError(null);
    console.log('In changePassword');
    console.log(`body Of changePassword: ${JSON.stringify({ old_password, new_password })}`);

    try {
      // AsyncStorage contains: firstName, email and token
      const { email } = user;
      console.log(`in changePassword, email: ${email}`);
      const { token } = JSON.parse(await AsyncStorage.getItem('user'));
      console.log('Change Password:  : Port ');
      const response = await fetch(changePasswordRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ email, oldPassword: old_password, newPassword: new_password }),
      });

      const json = await response.json();

      if (!response.ok) {
        if (response.status === 401) { logout(); }
        setIsLoading(false);
        setError(json.mssg);
        console.log(error);
      }
      if (response.ok) {
        try {
          // Log the user out if change details is successful

          setIsLoading(false);
          logout();
        } catch (error) {
          setError(true);
          setIsLoading(false);
          console.error('Error Caught By Me!');
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { changePassword, isLoading, error };
  // const response = await fetch(`http://192.168.0.17:3001/api/user/sign_up`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({"email":"sadasds23ad@gmail.com","firstName":"asdasdsad","lastName":"asdasdsadsa","age":"23","password":"Password123!"})
  // })
}

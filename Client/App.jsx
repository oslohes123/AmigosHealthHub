import 'react-native-url-polyfill/auto';

import React from 'react';

import MainContainer from './navigation/MainContainer';
import AuthContainer from './navigation/AuthContainer';
import { AuthContextProvider, useAuthContext } from './navigation/screens/Authentication/context/AuthContext';

function App() {
  const { user } = useAuthContext();

  console.log(`in app.js, user: ${JSON.stringify(user)}`);
  return user === null ? <AuthContainer /> : <MainContainer />;
}

export default function () {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

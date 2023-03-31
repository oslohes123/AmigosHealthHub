import 'react-native-url-polyfill/auto';

import React from 'react';

import MainContainer from './src/MainContainer';
import AuthContainer from './src/AuthContainer';
import { AuthContextProvider, useAuthContext } from './src/screens/Authentication/context/AuthContext'

function App() {
  const { user } = useAuthContext();

  return user === null ? <AuthContainer /> : <MainContainer />;
}

export default function () {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

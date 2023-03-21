import "react-native-url-polyfill/auto";
import MainContainer from "./navigation/MainContainer";
import AuthContainer from "./navigation/AuthContainer";
import { AuthContextProvider } from "./navigation/screens/Authentication/context/AuthContext";
import { useAuthContext } from "./navigation/screens/Authentication/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

//Screen names
const mainContainerName = "Main app";
const authContainerName = "Auth screens";

function App() {
  const { user } = useAuthContext();
  const [showMainPage, setShowMainPage] = useState(false);
  // console.log(`in app.js, user: ${JSON.stringify(user)}`);
  return user === null ? <AuthContainer /> : <MainContainer />;
}

export default () => {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 500,
  },
  animation: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00BFFF",
  },
});

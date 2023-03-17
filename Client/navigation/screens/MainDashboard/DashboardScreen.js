import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import widget from "../../components/widget";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import react from "react";
import { useAuthContext } from "../Authentication/context/AuthContext";
import { useLogout } from "../Authentication/hooks/useLogOut";
import CaloriesBurntTodayWidget from "../../components/CaloriesBurntTodayWidget";
import { LinearGradient } from "expo-linear-gradient";

export default function DashboardScreen({ navigation }) {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  const { user } = useAuthContext();
  const welcomeMessage = `Welcome to your Dashboard,${user.firstName} `;

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={styles.title}
        onLongPress={() => {
          console.log("The user wants to see info about the dashboard.");
        }}
      >
        <Text>Welcome to your Dashboard,{user.firstName}</Text>
      </Text>
      <View style={styles.settings}>
        <Ionicons
          name={"cog"}
          size={50}
          colour={"white"}
          onPress={() => navigation.navigate("Settings")}
        ></Ionicons>
      </View>
      <Button title={"LogOut"} onPress={handleClick} />
      <CaloriesBurntTodayWidget />

      <TouchableOpacity >
          <LinearGradient
            colors={["blue", "grey"]}
            style={styles.widget}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.widgetText}>
              Word of the Day
              
            </Text>
            <Ionicons name="logo-wordpress" size={40} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity >
          <LinearGradient
            colors={["blue", "grey"]}
            style={styles.widget}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.widgetText}>
              Calories to Goal  
            </Text>
            <Text style={styles.widgetText}>1250cal</Text>
          </LinearGradient>
        </TouchableOpacity>

      <View style={styles.blankSpace}>
        {/* <Image style={styles.mainImage} source=Cal{require('assets/favicon.png')} /> */}
        {/* {widget({})} */}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "flex-start",
    fontSize: 32,
    fontWeight: "bold",
    padding: 15,
  },
  settings: {
    flex: 1,
    alignSelf: "flex-start",
    position: "absolute",
    top: 100,
    right: 10,
  },
  blankSpace: {
    flex: 1,
    justifyContent: "center",
  },
  mainImage: {
    width: 120,
    height: 120,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  widget: {
    paddingHorizontal: "15%",
    paddingVertical: "10%",
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center'
  },
  widgetText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  // settings: {
  //   flex: 1,
  //   alignSelf: "flex-start",
  //   position: "absolute",
  //   top: 10,
  //   right: 10,
  // },
});

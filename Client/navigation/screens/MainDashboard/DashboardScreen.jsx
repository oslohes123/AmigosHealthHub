import React, { useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import HoursSleptGraph from '../Sleep/hoursSleptGraph';
import themeContext from '../../theme/themeContext';
import { useAuthContext } from '../Authentication/context/AuthContext';
import CaloriesBurntTodayWidget from "../../components/CaloriesBurntTodayWidget";
import { LinearGradient } from "expo-linear-gradient";
export default function DashboardScreen({ navigation }) {
  const { user } = useAuthContext();
  const theme = useContext(themeContext);

  const welcomeMessage = `Welcome to your Dashboard, ${user.firstName} `;
  const background = { backgroundColor: theme.background };
  const textColour = { color: theme.color };

  const handlePress = () => {
    navigation.navigate('Sleep');
  };

  return (
    <SafeAreaView style={[styles.container, background]}>
      <ScrollView>
      <Text style={[styles.title, textColour]}>{welcomeMessage}</Text>
      <SafeAreaView style={styles.widgetContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Sleep')}>
          <View style={styles.graphContainer}>
            <HoursSleptGraph />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar style="auto" />
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
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  widgetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 30,
  },
  graphContainer: {
    position: 'relative',
  },

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
});

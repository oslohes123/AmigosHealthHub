import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import theme from '../../../theme/theme';
import themeContext from '../../../theme/themeContext';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useGetLastTrackedWorkout } from '../hooks/trackedWorkouts/useGetLastTrackedWorkout';
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
//Screen Names
const trackWorkoutName = 'Workout Plans'
const fitnessDashboardName = 'Fitness Dashboard'

export default function FitnessScreen({ navigation }) {
     const {getLastTrackedWorkout, isLoading}= useGetLastTrackedWorkout();
      const [getMostRecentWorkout, setMostRecentWorkout]= useState(null);
      const isFocused= useIsFocused();
    const theme = useContext(themeContext)

    useEffect(() => {
        setMostRecentWorkout(null);
        async function setLastTrackedWorkout(){
            const lastTrackedWorkout= await getLastTrackedWorkout();
            setMostRecentWorkout(lastTrackedWorkout);
        }
        setLastTrackedWorkout();

    }, [navigation, isFocused])
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>

            <View style={styles.blankSpace}>
                {/* <Image style={styles.mainImage} source={require('../../assets/favicon.png')} /> */}
            </View>

            <View style={styles.buttonView}>
                <Button title="Workouts Plans" onPress={() => {
                    console.log("The user wants to see their workout plans.")
                    navigation.navigate("Workout Plans")
                }} />
             

            <TouchableOpacity onPress={() => {
                    console.log("The user wants to see their workout history.")
                    navigation.navigate("Workout History")
                }}>
          <LinearGradient
            colors={["blue", "grey"]}
            style={styles.widget}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.header}>
            Workout History
              
            </Text>
            <Text>Last Tracked Workout:{getMostRecentWorkout}</Text>
            {isLoading && (
            <>
              {/* <Text>Refreshing.....</Text> */}
              <ActivityIndicator
                animating={true}
                size={25}
                color={MD2Colors.greenA400}
              />
            </>
          )}
            <Ionicons name="bar-chart-outline" size={40} color="white" />
          </LinearGradient>
        </TouchableOpacity>
            </View>
          

        <TouchableOpacity onPress={() => {
                    console.log("The user wants to see their workout stats.")
                    navigation.navigate("View Stats")
                }}>
          <LinearGradient
            colors={["blue", "grey"]}
            style={styles.widget}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.header}>
              View Stats
              
            </Text>
            <Ionicons name="bar-chart-outline" size={40} color="white" />
          </LinearGradient>
        </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    blankSpace: {
        flex: 1,
        justifyContent: 'center'
    },
    mainImage: {
        width: 120,
        height: 120,
    },
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'flex-start',
    // },
    buttonView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 40,
    },
    container: {
        backgroundColor: "#203038",
        flex: 1,
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
      header: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
      },
});

  
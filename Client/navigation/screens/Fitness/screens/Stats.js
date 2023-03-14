import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import React, {useState} from "react";
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";

export default function Stats() {

    const [selected, setSelected] = useState("")
    const [visible, setVisible] = useState(false)

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };

      const screenWidth = Dimensions.get("window").width;

      const chartConfig = {
        backgroundGradientFrom: "white",
        //backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#38D689",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

  return (
    <View style={styles.container}>
        <View style={styles.modalContainer}>
            <View style={styles.dropDownContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
            >
            <Text>{selected || 'Select a Workout'}</Text>
            </TouchableOpacity>
            <Modal
                visible={visible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.modal}>
                <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                    setSelected('Bench Press');
                    setVisible(false);
                }}
                >
                <Text>Bench Press</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                    setSelected('Push Ups');
                    setVisible(false);
                }}
                >
                <Text>Push Ups</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                    setSelected('Slow Jog');
                    setVisible(false);
                }}
                >
                <Text>Slow Jog</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                    setSelected('Pull Ups');
                    setVisible(false);
                }}
                >
                <Text>Pull Ups</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                    setSelected('Swimming');
                    setVisible(false);
                }}
                >
                <Text>Swimming</Text>
                </TouchableOpacity>
                </View>
            </Modal>
            </View>
         </View>

         <LineChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#203038',
      flex: 1,
    },
    modalContainer: {
        alignItems: 'center',
        marginTop: '15%',
        width: '100%'
    },
    dropDownContainer: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: '5%',
        width: '50%',
      },
      button: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 10,
        backgroundColor: 'white'
      },
      modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalButton: {
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
      },
})


import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Dimensions, Button, TextInput, Modal } from 'react-native';
import widget from '../../components/widget';
import { BarChart } from 'react-native-chart-kit';
import { useState, useContext } from 'react';

import themeContext from '../../theme/themeContext';

export default function DashboardScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const theme = useContext(themeContext)

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>

            <Text style={[styles.title, {color: theme.color}]}> DASHBOARD </Text>

            {/*Sleep Modal*/}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible)}}>
                <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <View style={[modalStyle.modalMain, {backgroundColor: theme.secondary}]}>
                        <Text style={[modalStyle.modalText, {color: theme.color}]}> Track Sleep </Text>
                        <View style={{width: screenWidth * 0.3, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>
                            <TextInput 
                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                placeholder='Hours' 
                                placeholderTextColor={theme.color} 
                                keyboardType={'numeric'} 
                                textAlign={'center'}
                            />
                            <TextInput 
                                style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                placeholder='Rating' 
                                placeholderTextColor={theme.color} 
                                keyboardType={'numeric'} 
                                textAlign={'center'}
                            />
                        </View>
                        <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <Button title='Dismiss' onPress={() => {setModalVisible(!modalVisible)}}/>
                            <Button title='Track' onPress={() => {setModalVisible(!modalVisible)}}/>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>

            {widget({
                widgetPress: () => {setModalVisible(!modalVisible)}, 
                interactive: true, 
                widgetText: 'Sleep', 
                widgetColor: '#01009c', 
                iconName: 'bed', 
                mainComponent: avgSleepRating(),
                width: screenWidth * 0.9
            })}

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

function avgSleepRating() {
  return (
    <View style={sleepStyles.content}>

        <View styles={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={sleepStyles.ratingText}>8.4</Text>
            <Text style={sleepStyles.avgText}>AVG</Text>
        </View>

        <BarChart
            data={data}
            width={screenWidth * 0.55}
            height={screenHeight * 0.13}
            yAxisSuffix='hrs'
            fromZero={true}
            showValuesOnTopOfBars
            xLabelsOffset={-30}
            withInnerLines={false}
            chartConfig={{
                backgroundGradientFrom: '#01009c',
                backgroundGradientTo: '#01009c',
                decimalPlaces: 1, 
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                decimalPlaces: 1,
            }}
        />

    </View>
  )
}


const data = {
    labels: ["Tues", "Weds", "Thur"],
    datasets: [
      {
        data: [7.4, 7.6, 5.5]
      }
    ]
  };

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

const styles = {
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}

const modalStyle = {
    modalMain: {
        justifyContent: 'space-between', 
        alignItems:'center', 
        height: screenHeight * 0.3, 
        width: screenWidth * 0.6, 
        borderRadius: 26, 
        padding: 40,
        borderWidth: 3
    },
    modalText: {
        fontSize: 26, 
        fontWeight: 'bold', 
    },
    textInput: { 
        borderRadius: 10, 
        borderWidth: 1, 
        width: screenWidth * 0.12, 
        height: screenHeight * 0.05,
        fontWeight: 'bold'
    },
}

const sleepStyles = {
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    ratingText: {
        color: '#fff',
        fontSize: 56,
        fontWeight: 'bold',
    },
    avgText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    }
}
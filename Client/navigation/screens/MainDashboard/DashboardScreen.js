import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Dimensions } from 'react-native';
import widget from '../../components/widget';
import { BarChart } from 'react-native-chart-kit';


export default function DashboardScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} onLongPress={() => {
                console.log("The user wants to see info about the dashboard.")
            }}>
                DASHBOARD
            </Text>
                {widget({interactive: false, widgetText: 'Sleep', widgetColor: '#01009c', iconName: 'bed', mainComponent: avgSleepRating(), width: screenWidth * 0.9})}
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
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
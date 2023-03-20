import { BarChart, LineChart } from 'react-native-chart-kit';
import { Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useContext } from 'react';

import themeContext from '../theme/themeContext';

//
const GraphWidget = (inputLabel, inputDataset, graphTitle, graphAttributes) => {
    const theme = useContext(themeContext);

    const chartData = {
        labels: inputLabel,
        datasets: [
            {
                data: inputDataset,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`
            }
        ]
    };

    const screenWidth = Dimensions.get('window').width * 0.95;
    const { yAxisSuffix } = graphAttributes;
    return (
        <SafeAreaView>
            <Text style={[styles.title, { color: theme.color }]}>
                {graphTitle}
            </Text>
            <BarChart
                data={chartData}
                width={screenWidth}
                height={220}
                yAxisSuffix={yAxisSuffix} // ' h'
                fromZero={true}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
                chartConfig={{
                    valueTextColor: 'white',
                    backgroundGradientFrom: '#c2e7fe',
                    backgroundGradientTo: theme.secondary,
                    fillShadowGradientFrom: theme.color,
                    fillShadowGradientTo: theme.color,
                    decimalPlaces: 0,
                    color: (opacity = 1) => theme.colorRGBA,
                    style: {
                        borderRadius: 16
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default GraphWidget;

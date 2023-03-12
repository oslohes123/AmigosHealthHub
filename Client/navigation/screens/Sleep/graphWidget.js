import { LineChart } from 'react-native-chart-kit';
import React from 'react';
const getSleep = require('./hooks/useGetSleep');

const data = getSleep;

const graphData = {
    labels: data.map((item) =>
        new Date(item.timestamp).toLocaleString('default', { weekday: 'short' })
    ),
    datasets: [
        {
            data: data.map((item) => item.hoursSlept),
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            strokeWidth: 2
        }
    ]
};

const GraphWidget = () => {
    return (
        <LineChart
            data={graphData}
            width={350}
            height={220}
            yAxisSuffix={'h'}
            yAxisInterval={1}
            chartConfig={{
                backgroundColor: '#e3e3e3',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726'
                }
            }}
            bezier
        />
    );
};

export default GraphWidget;

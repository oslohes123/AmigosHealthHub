import { ActivityIndicator, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import GraphWidget from './graphWidget';
import moment from 'moment';
import { useGetSleep } from './hooks/useGetSleep';

export default function hoursSleptGraph() {
    const { getSleep, isLoading, error } = useGetSleep();
    const [data, setData] = useState(['test']);

    useEffect(() => {
        const fetchData = async () => {
            const sleepData = await getSleep();
            // console.log(
            //     `Sleep data is in widget: ${JSON.stringify(sleepData)}`
            // );
            setData(sleepData);
        };

        fetchData();
    }, []);

    const graphTitle = 'Hours slept this week';
    const label = data.map((item) => moment(item.timestamp).format('ddd'));
    const dataset = data.map((item) => item.hoursSlept);
    const graphAttributes = {
        yAxisSuffix: ' h'
    };

    return (
        <View>
            {isLoading && <ActivityIndicator />}
            {error && <Text>{error}</Text>}
            {!isLoading &&
                !error &&
                GraphWidget(label, dataset, graphTitle, graphAttributes)}
        </View>
    );
}

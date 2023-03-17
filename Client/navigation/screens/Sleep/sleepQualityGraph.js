import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import GraphWidget from '../../components/graphWidget';
import moment from 'moment';
import { useGetSleep } from './hooks/useGetSleep';
import { useIsFocused } from '@react-navigation/native';

export default function SleepQaulityGraph() {
    const { getSleep, isLoading, error } = useGetSleep();
    const [data, setData] = useState(['test']);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const sleepData = await getSleep();
            // console.log(
            //     `Sleep data is in widget: ${JSON.stringify(sleepData)}`
            // );
            setData(sleepData);
        };

        fetchData();
    }, [isFocused]);

    const graphTitle = 'Sleep Quality this week';
    const label = data.map((item) => moment(item.timestamp).format('ddd'));
    const dataset = data.map((item) => item.sleepQuality);
    const graphAttributes = {
        yAxisSuffix: ' h'
    };

    return (
        <View>
            {isLoading && (
                <>
                    <ActivityIndicator
                        animating={true}
                        size={25}
                        color={MD2Colors.greenA400}
                    />
                </>
            )}
            {error && <Text>{error}</Text>}
            {!isLoading &&
                !error &&
                GraphWidget(label, dataset, graphTitle, graphAttributes)}
        </View>
    );
}

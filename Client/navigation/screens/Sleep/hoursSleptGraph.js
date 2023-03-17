import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import GraphWidget from '../../components/graphWidget';
import moment from 'moment';
import { useGetSleep } from './hooks/useGetSleep';
import { useIsFocused } from '@react-navigation/native';

export default function HoursSleptGraph({ navigation }) {
    const { getSleep, isLoading, error } = useGetSleep();
    const [data, setData] = useState(['test']);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const sleepData = await getSleep();
            setData(sleepData);
        };
        fetchData();
    }, [navigation, isFocused]);

    const graphTitle = 'Hours slept this week';
    const label = data.map((item) => moment(item.timestamp).format('ddd'));
    const dataset = data.map((item) => item.hoursSlept);
    const graphAttributes = {
        yAxisSuffix: ' h'
    };
    console.log(`label: ${label}`);
    console.log(`dataset: ${dataset}`);
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

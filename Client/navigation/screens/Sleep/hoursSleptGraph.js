import {
    ActivityIndicator,
    Button,
    MD2Colors,
    Surface,
    Text
} from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import GraphWidget from '../../components/graphWidget';
import moment from 'moment';
import { useGetSleep } from './hooks/useGetSleep';
import { useIsFocused } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function HoursSleptGraph({ navigation }) {
    const { getSleep, isLoading, error } = useGetSleep();
    const [data, setData] = useState(['test']);
    const isFocused = useIsFocused();
    const screenWidth = Dimensions.get('window').width * 0.95;

    const route = useRoute();

    useEffect(() => {
        const fetchData = async () => {
            const sleepData = await getSleep();
            setData(sleepData);
        };
        fetchData();
    }, [navigation, isFocused]);

    if (data === undefined) {
        if (route.name === 'Sleep') return <></>;
        return (
            <View>
                <Surface
                    style={[styles.surface, { width: screenWidth }]}
                    elevation={4}
                >
                    <Text variant="headlineSmall">Add sleep data.</Text>
                </Surface>
            </View>
        );
    } else {
        const graphTitle = 'Hours slept this week';
        const label = data.map((item) => moment(item.timestamp).format('ddd'));
        const dataset = data.map((item) => item.hoursSlept);
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
}

const styles = StyleSheet.create({
    surface: {
        backgroundColor: '#c2e7fe',
        padding: 8,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    }
});

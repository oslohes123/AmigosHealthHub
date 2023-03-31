import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import GraphWidget from '../../components/graphWidget';
import useGetSleep from './hooks/useGetSleep';

export default function SleepQaulityGraph() {
  const { getSleep, isLoading, error } = useGetSleep();
  const [data, setData] = useState(['test']);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const sleepData = await getSleep();

      setData(sleepData);
    };

    fetchData();
  }, [isFocused]);

  if (data === undefined) {
    return (
    <View />);
  }

  const graphTitle = 'Sleep Quality this week';
  const label = data.map((item) => moment(item.timestamp).format('ddd'));
  const dataset = data.map((item) => item.sleepQuality);
  const graphAttributes = {
    yAxisSuffix: '',
  };

  return (
    <View>
      {isLoading && (
        <ActivityIndicator
          animating
          size={25}
          color={MD2Colors.greenA400}
        />
      )}
      {error && <Text>{error}</Text>}
      {!isLoading
                && !error
                && GraphWidget(label, dataset, graphTitle, graphAttributes)}
    </View>
  );
}

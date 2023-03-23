import {
  ActivityIndicator,
  MD2Colors,
  Surface,
  Text,
} from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';

import moment from 'moment';
import GraphWidget from '../../components/graphWidget';
import useGetSleep from './hooks/useGetSleep';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#c2e7fe',
    marginVertical: 10,
    padding: 20,
    borderRadius: 25,
    height: screenHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default function HoursSleptGraph({ navigation }) {
  const { getSleep, isLoading, error } = useGetSleep();
  const [data, setData] = useState(['test']);
  const isFocused = useIsFocused();

  const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      const sleepData = await getSleep();
      setData(sleepData);
    };
    fetchData();
  }, [navigation, isFocused]);

  if (data === undefined) {
    // eslint-disable-next-line react/jsx-no-useless-fragment, react/jsx-filename-extension
    if (route.name === 'Sleep') return <></>;
    return (
      <View>
        <Surface
          style={[styles.surface, { width: screenWidth * 0.9 }]}
          elevation={4}
        >
          <Text style={styles.header}>Add sleep data</Text>
        </Surface>
      </View>
    );
  }
  const graphTitle = 'Hours slept this week';
  const label = data.map((item) => moment(item.timestamp).format('ddd'));
  const dataset = data.map((item) => item.hoursSlept);
  const graphAttributes = {
    yAxisSuffix: ' h',
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

import {
  Button,
  Divider,
  Modal,
  Portal,
  Provider,
  Surface,
  Text,
} from 'react-native-paper';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useState } from 'react';

import { Calendar } from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import HoursSleptGraph from './hoursSleptGraph';
import SleepQaulityGraph from './sleepQualityGraph';
import themeContext from '../../theme/themeContext';
import useAddSleep from './hooks/useAddSleep';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 20,
  },
  graphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  picker: {
    width: 200,
  },
  divider: {
    marginTop: 10,
    padding: 2,
  },
  surface: {
    backgroundColor: '#c2e7fe',
    padding: 8,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  errorMsg: {
    margin: 5,
    color: 'red',
    alignSelf: 'center',
  },
});

export default function SleepScreen() {
  const theme = useContext(themeContext);
  const background = { backgroundColor: theme.background };

  const { addSleep } = useAddSleep();

  const [visible, setVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width * 0.95;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [timestamp, setTimestamp] = useState(moment().format('YYYY-MM-DD'));

  const [openHoursSlept, setOpenHoursSlept] = useState(false);
  const [selectedHoursSlept, setSelectedHoursSlept] = useState('8');
  const [itemsHoursSlept, setItemsHoursSlept] = useState([
    { label: '0 hours', value: '0' },
    { label: '1 hours', value: '1' },
    { label: '2 hours', value: '2' },
    { label: '3 hours', value: '3' },
    { label: '4 hours', value: '4' },
    { label: '5 hours', value: '5' },
    { label: '6 hours', value: '6' },
    { label: '7 hours', value: '7' },
    { label: '8 hours', value: '8' },
    { label: '9 hours', value: '9' },
    { label: '10 hours', value: '10' },
    { label: '11 hours', value: '11' },
    { label: '12 hours', value: '12' },
    { label: '13 hours', value: '13' },
    { label: '14 hours', value: '14' },
    { label: '15 hours', value: '15' },
    { label: '16 hours', value: '16' },
    { label: '17 hours', value: '17' },
  ]);

  const [openSleepQuality, setOpenSleepQuality] = useState(false);
  const [selectedSleepQuality, setSelectedSleepQuality] = useState('5');
  const [itemsSleepQuality, setItemsSleepQuality] = useState([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ]);

  const submitSleepData = () => {
    addSleep(selectedHoursSlept, selectedSleepQuality, timestamp);
  };

  return (
    <Provider>
      <SafeAreaView style={[styles.container, background]}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Text variant="titleSmall" style={styles.errorMsg}>
              Picking the same date will update your previous sleep statitics.
            </Text>
            <Calendar
              onDayPress={(date) => {
                setTimestamp(date.dateString);
              }}
              enableSwipeMonths
              maxDate={moment().format('YYYY-MM-DD')}
            />
            <Text variant="titleSmall">
              Date picked:
              {' '}
              {moment(timestamp).format('dddd Do MMM YYYY')}
            </Text>
            <Divider style={styles.divider} />
            <Text variant="titleMedium">
              How many hours did you sleep?
            </Text>
            <DropDownPicker
              open={openHoursSlept}
              dropDownDirection="TOP"
              value={selectedHoursSlept}
              items={itemsHoursSlept}
              setOpen={setOpenHoursSlept}
              setValue={setSelectedHoursSlept}
              setItems={setItemsHoursSlept}
            />

            <Divider style={styles.divider} />

            <Text variant="titleMedium">
              What would you rate your sleep?
            </Text>

            <DropDownPicker
              open={openSleepQuality}
              value={selectedSleepQuality}
              items={itemsSleepQuality}
              setOpen={setOpenSleepQuality}
              setValue={setSelectedSleepQuality}
              setItems={setItemsSleepQuality}
            />
            <Button
              style={[styles.divider]}
              testID="addSleepData"
              icon="check"
              mode="outlined"
                            // textColor={theme.color}
              onPress={() => {
                submitSleepData();
                hideModal();
              }}
            >
              Add sleep data
            </Button>
          </Modal>
        </Portal>

        <SafeAreaView style={styles.fabContainer}>
          <TouchableOpacity
            onPress={() => {
              showModal();
            }}
          >
            <Surface
              style={[styles.surface, { width: screenWidth }]}
              elevation={4}
            >
              <Text variant="headlineSmall">Add sleep data.</Text>
            </Surface>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.graphContainer}>
          <SleepQaulityGraph />
          <HoursSleptGraph />
        </SafeAreaView>
      </SafeAreaView>
    </Provider>
  );
}

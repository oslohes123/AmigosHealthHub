// Make a form to give a word to describe a users day and select a value from the slider
import * as Yup from 'yup';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Formik } from 'formik';
// npm install , npm install @react-native-community/slider --save
import { globalStyles } from '../../../styles/global';
import useSubmit from './hooks/useAddWordFace';

// make a list of faces to be selected from to be displayed in form
const worst = require('../../../assets/Worst.png');
const sad = require('../../../assets/Sad.png');
const neutral = require('../../../assets/Neutral.png');
const happy = require('../../../assets/Happy.png');
const perfect = require('../../../assets/Perfect.png');

const moodImage = [
  worst, sad, neutral, happy, perfect,
];
// make requirements using Yup for the text input word
const mentalHealthSchema = Yup.object().shape({
  word: Yup.string().required('Word Of Today cannot be empty!'),
  word1: Yup.string().max(10, 'Word/expression has to be shorter than 11 characters'),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {},
  button: {},
  scrollbar: {},
  label: {
    fontSize: 24,
    padding: 10,
  },
});

export default function rateMentalHealthForm() {
  const { submit, isLoading, error } = useSubmit();
  const [faceInputValue, setFaceValue] = useState(3);
  const [moodI, setRangeI] = useState(neutral);
  // this function changes the slider value when slider is used
  const handleFaceInputChange = (value) => {
    setFaceValue(value);
    setRangeI(moodImage[value]);
  };
  // return the components for the form
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ word: '' }}
        // increment face value as graph values from range 1-5 compared to 0-4 is more user friendly
        onSubmit={async (values) => {
          await submit(faceInputValue + 1, values.word);
        }}
        validationSchema={mentalHealthSchema}
      >
        {(props) => (
          <View>
            <Text style={styles.label}>Word:</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Word Of The Day:"
              onChangeText={props.handleChange('word')}
              value={props.values.word}
            />
            <Text>{props.errors.word}</Text>
            <Text style={styles.label}>Face:</Text>
            <Image source={moodI} style={styles.image} />
            <Slider
              style={{ width: 250, height: 40 }}
              minimumValue={0}
              maximumValue={4}
              minimumTrackTintColor="green"
              maximumTrackTintColor="green"
              thumbTintColor="green"
              value={faceInputValue}
              step={1}
              onValueChange={(value) => handleFaceInputChange(value)}
            />
            <Button
              title="Submit!"
              onPress={props.handleSubmit}
              disabled={isLoading}
            />
            {error && <Text>{error}</Text>}
          </View>
        )}
      </Formik>
    </View>
  );
}

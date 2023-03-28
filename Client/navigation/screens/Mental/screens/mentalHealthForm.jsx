// Make a form to give a word to describe a users day and select a value from the slider
import * as Yup from 'yup';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import themeContext from '../../../theme/themeContext';

import useSubmit from '../hooks/useAddWordFace';

// make a list of faces to be selected from to be displayed in form
const worst = require('../../../../assets/Worst.png');
const sad = require('../../../../assets/Sad.png');
const neutral = require('../../../../assets/Neutral.png');
const happy = require('../../../../assets/Happy.png');
const perfect = require('../../../../assets/Perfect.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
    justifyContent: 'space-between',
    padding: 20,
  },
  input: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.5,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    alignSelf: 'center',
  },
  button: {},
  scrollbar: {},
  label: {
    fontSize: 24,
    padding: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default function RateMentalHealthForm() {
  const {
    background,
    color,
  } = useContext(themeContext);
  const { submit, isLoading, error } = useSubmit();
  const [faceInputValue, setFaceValue] = useState(3);
  const [moodI, setRangeI] = useState(happy);
  // this function changes the slider value when slider is used
  const handleFaceInputChange = (value) => {
    setFaceValue(value);
    setRangeI(moodImage[value]);
  };
  // return the components for the form
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Formik
        initialValues={{ word: '' }}
        // increment face value as graph values from range 1-5 compared to 0-4 is more user friendly
        onSubmit={async (values) => {
          await submit(faceInputValue + 1, values.word);
        }}
        validationSchema={mentalHealthSchema}
      >
        {(props) => (
          <View style={[styles.container, { backgroundColor: background }]}>
            <Text style={[styles.label, { color }]}>Face:</Text>
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
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.label, { color }]}>Word:</Text>
              <TextInput
                style={[styles.input, { borderColor: color, color }]}
                placeholder="Word Of The Day:"
                placeholderTextColor={color}
                onChangeText={props.handleChange('word')}
                value={props.values.word}
              />
            </View>
            <Text style={{ color }}>{props.errors.word}</Text>
            <Button
              title="Submit!"
              onPress={props.handleSubmit}
              disabled={isLoading}
            />
            {error && <Text style={{ color }}>{error}</Text>}
          </View>
        )}
      </Formik>
    </View>
  );
}

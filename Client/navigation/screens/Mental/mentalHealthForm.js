import * as Yup from "yup";
// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Formik } from "formik";
//npm install , npm install @react-native-community/slider --save
import { globalStyles } from "../../../styles/global";
import { useSubmit } from "./hooks/useAddWordFace";
const moodImage = [
  require("../../../assets/Worst.png"),
  require("../../../assets/Sad.png"),
  require("../../../assets/Neutral.png"),
  require("../../../assets/Happy.png"),
  require("../../../assets/Perfect.png"),
];
const mentalHealthSchema = Yup.object().shape({
  word: Yup.string().required("Word Of Today cannot be empty!"),
  word: Yup.string().max(35, "Word/expression has to be shorter than 35 letters"),
});

export const rateMentalHealthForm = () => {
  const { submit, isLoading, error } = useSubmit();
  const [faceInputValue, setFaceValue] = useState(3);
  const [moodI, setRangeI] = useState(require("../../../assets/Neutral.png"));

  const handleFaceInputChange = (value) => {
    setFaceValue(value);
    setRangeI(moodImage[value])
  };
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ word: ""}}
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
              onChangeText={props.handleChange("word")}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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

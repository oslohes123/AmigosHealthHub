import * as Yup from "yup";

import { Button, Text, TextInput, View, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLogout } from "../../Authentication/hooks/useLogOut";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { globalStyles } from "../../../../styles/global";
import { useAuthContext } from "../../Authentication/context/AuthContext";
import { useChangeProfileDetails } from "../hooks/useChangeProfileDetails";

// import { getUserInfo } from '../hooks/getUserInfo';
const getUserInfo = require("../hooks/getUserInfo");

const ChangeUserDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),

  lastName: Yup.string().required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),

  age: Yup.number().positive("Age must be positive"),
});

// async function getUserDetails() {
//     const jsonData = await AsyncStorage.getItem('user');
//     const userEmail = JSON.parse(jsonData);
//     console.log(`Email: ${userEmail}`);
//     return userEmail;
// }

export const formikChangeUserDetailsForm = () => {
  const { logOut } = useLogout();
  const [email, setEmail] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [age, setage] = useState(null);
  const { changeStats, isLoading, error } = useChangeProfileDetails();
  async function setInitialValues() {
    const userInfo = await getUserInfo.getUserInfo();

    setEmail(userInfo.user.email);
    setfirstName(userInfo.user.firstName);
    setlastName(userInfo.user.lastName);
    setage(userInfo.user.age);
    // if (email == "Loading...") {
    //   logOut();
    // }
  }
  setInitialValues();
  console.log(`email: ${email}`);
  console.log(`age: ${age}`);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: email,
          firstName: firstName,
          lastName: lastName,
          age: "" + age,
        }}
        onSubmit={async (values) => {
          await changeStats(
            values.firstName,
            values.lastName,
            values.email,
            values.age
          );
        }}
        validationSchema={ChangeUserDetailsSchema}
      >
        {(props) => (
          <View>
            <Text style={styles.head}>First Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="First Name"
              onChangeText={props.handleChange("firstName")}
              value={props.values.firstName}
            />
            <Text>{props.errors.firstName}</Text>

            <Text style={styles.head}>Last Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Last Name"
              onChangeText={props.handleChange("lastName")}
              value={props.values.lastName}
            />
            <Text>{props.errors.lastName}</Text>

            <Text style={styles.head}>Email</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              keyboardType="email-address"
            />
            <Text>{props.errors.email}</Text>

            <Text style={styles.head}>Age</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Age"
              onChangeText={props.handleChange("age")}
              value={props.values.age}
              keyboardType="number-pad"
            />
            <Text>{props.errors.age}</Text>

            <Button
              title="Save details"
              onPress={props.handleSubmit}
              disabled={isLoading}
            />
            {error && <Text className="error">{error}</Text>}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '2%',
    //marginTop: '2%'
  },
})

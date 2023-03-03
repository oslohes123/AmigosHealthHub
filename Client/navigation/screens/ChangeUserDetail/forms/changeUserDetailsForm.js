import * as Yup from "yup";

import { Button, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";

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
  // useEffect(() => {

  //     myfunction();
  //     },[])
  const [email, setEmail] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [age, setage] = useState(null);
  const { changeStats, isLoading, error } = useChangeProfileDetails();
  async function setInitialValues() {
    const userInfo = await getUserInfo.getUserInfo();

    //   console.log(`userInfo: ${JSON.stringify(userInfo)}`);
    //   console.log(`userInfo: ${JSON.stringify(userInfo.user.email)}`);
    setEmail(userInfo.user.email);
    setfirstName(userInfo.user.firstName);
    setlastName(userInfo.user.lastName);
    setage(userInfo.user.age);
  }
  setInitialValues();
  console.log(`email: ${email}`);
  console.log(`age: ${age}`);
  //  const initialEmail =  userInfo.email;
  //  const initialFirstName =  userInfo.firstName;
  //  const initialLastName =  userInfo.lastName;
  //  const initialAge =  userInfo.age;
  //  console.log(`userInfo: ${JSON.stringify(userInfo)}`)
  //  console.log(`initialEmail: ${initialEmail}`)

  return (
    <View style={globalStyles.container}>
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
            <TextInput
              style={globalStyles.input}
              placeholder="First Name"
              onChangeText={props.handleChange("firstName")}
              value={props.values.firstName}
            />
            <Text>{props.errors.firstName}</Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Last Name"
              onChangeText={props.handleChange("lastName")}
              value={props.values.lastName}
            />
            <Text>{props.errors.lastName}</Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              keyboardType="email-address"
            />
            <Text>{props.errors.email}</Text>

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
    </View>
  );
};

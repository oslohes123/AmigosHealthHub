// import * as Yup from 'yup';

import { Dimensions, Text, TextInput, View, Switch } from 'react-native';
import { useState, useContext } from 'react';
import { Formik } from 'formik';
import React from 'react';
import themeContext from '../../../theme/themeContext';
import GreenButton from '../../../components/GreenButton';
// import { globalStyles } from '../../../../styles/global';
// import { useLogin } from '../hooks/useLogin';


// const trackExerciseSchema = Yup.object().shape({
//     setsOrDistance: Yup.number().positive().float(),
//     repsOrTime: Yup.number().positive().float(),
//     calories: Yup.number.positive().float().required(),
//     warmUpSetFlag: Yup.bool().required(),

//     // password: Yup.string()
//     //     .required('No password provided.')
//     //     .min(8, 'Password is too short - should be 8 chars minimum.')
//     //     .matches(
//     //         passwordRegex,
//     //         'Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)'
//     //     )
// });

export const formikTrackExerciseForm = ({navigation, exerciseInfo}) => {
    // const { login, isLoading, error } = useLogin();
    const theme = useContext(themeContext)
    const [warmUpSet, setWarmUpSet] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    return (
        <View>
            <Formik
                initialValues={{ sets: 0, reps: 0, weight: 0, calories: 0, distance: 0, duration: 0, warmUpSet: false }}
                onSubmit={async (values) => {
                    // await login(values.email, values.password);
                    console.log('Form Loaded')
                }}
                // validationSchema={trackExerciseSchema}
            >
                {(props) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {exerciseInfo.type != 'cardio' ?
                        <View style={{width: screenWidth * 0.8, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>     
                            <View style={{width: screenWidth * 0.4, flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center'}}>
                                <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>
                                    <TextInput 
                                        style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                        placeholder='Sets' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={props.handleChange('sets')}
                                        value={props.values.setsOrDistance}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                                    <Text>{props.errors.sets}</Text>
                                    <TextInput 
                                        style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                        placeholder='Reps' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={props.handleChange('reps')}
                                        value={props.values.repsOrTime}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                                    <Text>{props.errors.reps}</Text>
                                </View>

                                <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>
                                    <TextInput 
                                        style={[modalStyle.textInput, {borderColor: theme.color, alignSelf: 'center'}]} 
                                        placeholder='Calories' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={props.handleChange('calories')}
                                        value={props.values.calories}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                        />
                                    <Text>{props.errors.calories}</Text>
                                    <TextInput 
                                        style={[modalStyle.textInput, {borderColor: theme.color, alignSelf: 'center'}]} 
                                        placeholder='Weight' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={props.handleChange('weight')}
                                        value={props.values.repsOrTime}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                        />
                                    <Text>{props.errors.weight}</Text>
                                </View>
                            </View>

                            <View style={{width: screenWidth * 0.3, flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
                                <Text style={{color: theme.color, fontSize: 16, alignSelf: 'center', padding: 5, fontWeight: 'bold'}}>Warm Up Set</Text>
                                <Switch
                                    style={{alignSelf: 'center'}}
                                    value={warmUpSet}
                                    onValueChange={(value) => {setWarmUpSet(value)}}
                                />
                            </View>
                        </View>
                        :
                        <View style={{width: screenWidth * 0.8, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>     
                            <View style={{width: screenWidth * 0.4, flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center'}}>
                                <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>
                                    <TextInput 
                                        style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                        placeholder='Distance' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={props.handleChange('distance')}
                                        value={props.values.setsOrDistance}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                                    <Text>{props.errors.distance}</Text>
                                    <TextInput 
                                        style={[modalStyle.textInput, {borderColor: theme.color}]} 
                                        placeholder='Duration' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={props.handleChange('duration')}
                                        value={props.values.repsOrTime}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                                    <Text>{props.errors.duration}</Text>
                                </View>

                                <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                                    <TextInput 
                                        style={[modalStyle.textInput, {borderColor: theme.color, alignSelf: 'center'}]} 
                                        placeholder='Calories' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={props.handleChange('calories')}
                                        value={props.values.calories}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                        />
                                    <Text>{props.errors.calories}</Text>
                                </View>
                            </View>
                        </View>
                        }

                        <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
                            {/* {RedButton({height: screenHeight * 0.05, width: screenWidth * 0.2, fontSize: 12, text: "Dismiss", buttonFunction: () => {
                                setModalVisible(!modalVisible)
                                console.log("Dismiss Info")}})} */}
                            {GreenButton({height: screenHeight * 0.05, width: screenWidth * 0.2, fontSize: 12, text: "Add", buttonDisabled: isDisabled, buttonFunction: () => {
                                console.log("Add To Workout")
                                // setIsDisabled(!isDisabled)
                                props.handleSubmit
                                navigation.pop()}})}
                        </View>
                            {/* {error && <Text className="error">{error}</Text>} */}
                    </View>
                    )}
            </Formik>
        </View>
    );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const modalStyle = {
    modalMain: {
        justifyContent: 'space-between', 
        alignItems:'center', 
        height: screenHeight * 0.8, 
        width: screenWidth * 0.9, 
        borderRadius: 26, 
        padding: 20,
        borderWidth: 3
    },
    modalText: {
        fontSize: 30,
        textAlign: 'center', 
        fontWeight: 'bold', 
    },
    textInput: { 
        borderRadius: 10, 
        borderWidth: 1, 
        margin: 5,
        width: screenWidth * 0.15, 
        height: screenHeight * 0.05,
        fontWeight: 'bold'
    },
}

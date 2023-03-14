import { View, Text, SafeAreaView, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, Modal, unstable_enableLogBox } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import themeContext from '../../../theme/themeContext'
import { IconButton } from 'react-native-paper'
import GreenButton from '../../../components/GreenButton'
import RedButton from '../../../components/RedButton'
import CommonButton from '../../../components/CommonButton'

import { useGetWorkoutDetails } from '../hooks/useGetWorkoutDetails'

export default function WorkoutPlanInfoScreen({ route, navigation }) {
    const theme = useContext(themeContext) 
    const [instructionModalData, setInstructionModalData] = useState('No Instructions Available')
    const [modalVisible, setModalVisible] = useState(false)

    const [workoutDetails, setWorkoutDetails] = useState([])
    const { getWorkoutDetails, isLoading, error } = useGetWorkoutDetails();

    const [setsArray, setSetsArray] = useState({});
    const [repsArray, setRepsArray] = useState({});
    const [weightArray, setWeightArray] = useState({});
    const [exRepsEtc, setExRepsEtc] = useState([])

    useEffect(() => {
        async function fetchWorkoutDetails(item) {
            const data = await getWorkoutDetails(item)
            console.log(`workout data: ${JSON.stringify(data)}`)
            setWorkoutDetails(data)
        }
        console.log(`Route Params: ${JSON.stringify(route.params)}`)
        fetchWorkoutDetails(route.params)
    }, [])

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', maxHeight: screenHeight, alignItems:'center', paddingVertical: 10, backgroundColor: theme.background}}>

            {/*Exercise Instruction Modal*/}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <View style={[modalStyle.modalMain, {backgroundColor: theme.secondary}]}>
                        
                        <Text style={[modalStyle.modalText, {color: theme.color}]}>Instructions</Text>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, margin: 20, width: screenWidth * 0.7, borderColor: theme.color}}>
                            <Text style={{color: theme.color}}>{instructionModalData}</Text>
                        </View>
                        {RedButton({height: screenHeight * 0.05, width: screenWidth * 0.2, fontSize: 12, text: "Dismiss", buttonFunction: () => {
                            setModalVisible(!modalVisible)
                            console.log("Dismiss Info")}})}
                    </View>
                </SafeAreaView>
            </Modal>

            <Text style={[styles.text, {color: theme.color}]}>{route.params}</Text>

            {console.log(`Workout Details: ${workoutDetails}`)}

            <ScrollView alignContent={'center'} borderColor={theme.color} borderRadius={26} borderWidth={2} showsVerticalScrollIndicator={false} alignItems='center' style={{margin: 10, width: screenWidth * 0.9}}>
                {workoutDetails.map((item) => (
                    <TouchableWithoutFeedback style={{padding: 40}}>
                        <View style={[styles.exerciseSection, {borderColor: theme.color}]}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 20, padding: 5, width: screenWidth * 0.6}} key={item.exercise.name}>{item.exercise.name}</Text>
                                <IconButton icon="information" iconColor={theme.color} size={20} key={item.exercise.instructions} onPress={() => {
                                    console.log(`instructions: ${item.exercise.instructions}`)
                                    setInstructionModalData(item.exercise.instructions)
                                    setModalVisible(!modalVisible)}}/>                        
                            </View>
                            <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                <Text style={{color: theme.color, fontSize: 10}}>Muscle</Text>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}} key={item.exercise.muscle}>{item.exercise.muscle}</Text>
                            </View>
                            <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                <Text style={{color: theme.color, fontSize: 10}}>Equipment</Text>
                                {console.log(`item equipment: ${item.exercise.equipment}`)}
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}} key={item.exercise.equipment}>{item.exercise.equipment || item.exercise.equipment == "body_only" ? "n/a" : item.exercise.equipment}</Text>
                            </View>
                            <View style={styles.statsRows}>
                                <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={item.calories}>Calories: {item.calories} kcal</Text>
                                <TextInput 
                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                    placeholder='Calories (kcal)' 
                                    color={theme.color}
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                />
                            </View>

                            {item.exercise.type == 'cardio'  ?  
                            <>
                                <View style={styles.statsRows}>
                                    {console.log(`distance: ${item.distance}`)}
                                    <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={item.distance}>Distance: {item.distance} m</Text>
                                    <TextInput 
                                        style={[styles.textInput, {borderColor: theme.color}]} 
                                        placeholder='Distance (m)' 
                                        color={theme.color}
                                        placeholderTextColor={theme.color} 
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                        />
                                </View>
                                <View style={styles.statsRows}>
                                    <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={item.duration}>Duration: {item.duration} mins</Text>
                                    <TextInput 
                                        style={[styles.textInput, {borderColor: theme.color}]} 
                                        placeholder='Duration (mins)' 
                                        color={theme.color}
                                        placeholderTextColor={theme.color} 
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                                </View>
                            </>
                            : 
                            <>
                            {/* {exRepsEtc != [] && exRepsEtc != [[item.name, item.sets, returnDataArray(item.sets, item.reps), returnDataArray(item.sets, item.weight)]] ? 
                            setExRepsEtc(exRepsEtc.concat([[item.name, item.sets, returnDataArray(item.sets, item.reps), returnDataArray(item.sets, item.weight)]])) : 
                            (exRepsEtc ? setExRepsEtc([[item.name, item.sets, returnDataArray(item.sets, item.reps), returnDataArray(item.sets, item.weight)]])) : <></>}
                            
                            {console.log(`exRepsEtc: ${JSON.stringify(exRepsEtc)}`)}

                            {exRepsEtc.map((ex) => {
                                {if (ex[0] === item.name) {
                                    ex[2].forEach(element => {
                                        <>
                                            <View style={styles.statsRows}>
                                                {console.log(`distance: ${item.distance}`)}
                                                <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={`${item.name}Reps`}>Reps {item.reps}</Text>
                                                <TextInput 
                                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                                    placeholder='Reps Completed' 
                                                    color={theme.color}
                                                    placeholderTextColor={theme.color} 
                                                    keyboardType={'numeric'} 
                                                    textAlign={'center'}
                                                    defaultValue={element}
                                                    />
                                            </View>
                                            <View style={styles.statsRows}>
                                                <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={`${item.name}Weight`}>Weight {item.weight}</Text>
                                                <TextInput 
                                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                                    placeholder='Weight' 
                                                    color={theme.color}
                                                    placeholderTextColor={theme.color} 
                                                    keyboardType={'numeric'} 
                                                    textAlign={'center'}
                                                    defaultValue={ex[3][0]}
                                                    />
                                            </View>
                                        </>
                                    });
                                }}
                            })} */}

                            {/* {setsComponent(item, theme)} */}
                                {/* {(item) => {
                                    for (let i = 0; i < item.sets; i++) {
                                        <>
                                            <View style={styles.statsRows}>
                                                {console.log(`distance: ${item.distance}`)}
                                                <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={item.reps}>Reps {rep}</Text>
                                                <TextInput 
                                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                                    placeholder='Reps Completed' 
                                                    color={theme.color}
                                                    placeholderTextColor={theme.color} 
                                                    keyboardType={'numeric'} 
                                                    textAlign={'center'}
                                                    />
                                            </View>
                                            <View style={styles.statsRows}>
                                                <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={item.weight}>Weight {item.weight}</Text>
                                                <TextInput 
                                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                                    placeholder='Weight' 
                                                    color={theme.color}
                                                    placeholderTextColor={theme.color} 
                                                    keyboardType={'numeric'} 
                                                    textAlign={'center'}
                                                    />
                                            </View>
                                        </>
                                    }
                                }} */}
                            </>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                ))}

                    
            </ScrollView>
            <View style={styles.bottomButtons}>
                {RedButton({height: screenHeight * 0.05, width: screenWidth * 0.2, fontSize: 20, text: "Delete", buttonFunction: () => {
                    console.log("Delete Workout Plan")
                    navigation.pop()}})}
                {CommonButton({height: screenHeight * 0.05, width: screenWidth * 0.2, fontSize: 20, text: "Edit", buttonFunction: () => {
                    console.log("Edit Workout Plan")}})}
                {GreenButton({height: screenHeight * 0.05, width: screenWidth * 0.2, fontSize: 20, text: "Track", buttonFunction: () => {
                    console.log("Track Workout Data")
                    navigation.pop()}})}
            </View>
        </SafeAreaView>
    )
}

function returnDataArray(itemSets, itemData) {
    let dataArray = []
    for (let i=0; i<itemSets; i++) {
        dataArray.push(itemData);
    }
    return dataArray;
}

const setsComponent = (item, theme) => {
    for (let i = 0; i < item.sets; i++) {
        <>
            <View style={styles.statsRows}>
                {console.log(`distance: ${item.distance}`)}
                <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={item.reps}>Reps {item.reps}</Text>
                <TextInput 
                    style={[styles.textInput, {borderColor: theme.color}]} 
                    placeholder='Reps Completed' 
                    color={theme.color}
                    placeholderTextColor={theme.color} 
                    keyboardType={'numeric'} 
                    textAlign={'center'}
                    />
            </View>
            <View style={styles.statsRows}>
                <Text style={[styles.statsText, {color: theme.color, alignSelf: 'center'}]} key={item.weight}>Weight {item.weight}</Text>
                <TextInput 
                    style={[styles.textInput, {borderColor: theme.color}]} 
                    placeholder='Weight' 
                    color={theme.color}
                    placeholderTextColor={theme.color} 
                    keyboardType={'numeric'} 
                    textAlign={'center'}
                    />
            </View>
        </>
    }
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
    text: {
        fontSize: 30,
        textAlign: 'center', 
        fontWeight: 'bold', 
    },
    textInput: { 
        borderRadius: 10, 
        borderWidth: 1, 
        width: screenWidth * 0.35, 
        height: screenHeight * 0.05,
        fontWeight: 'bold'
    },
    exerciseSection: {
        justifyContent: 'space-evenly', 
        borderWidth: 2, 
        borderRadius: 26, 
        padding: 10, 
        marginVertical: 10,
        width: screenWidth * 0.8,
    },
    statsText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    statsRows: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 5
    },
    bottomButtons: {
        width: screenWidth * 0.8, 
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        padding: 5
    }
}

const modalStyle = {
    modalMain: {
        justifyContent: 'space-between', 
        alignItems:'center', 
        width: screenWidth * 0.8, 
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
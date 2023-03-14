import { FAB, Checkbox, Snackbar } from 'react-native-paper'
import { Text, View, SafeAreaView, Dimensions, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import themeContext from '../../../theme/themeContext';
import { useGetExerciseByName } from '../hooks/useGetExerciseByName';


export default function ExerciseInfoScreen({ route, navigation }) {
    const theme = useContext(themeContext)
    const { getExerciseByName, isLoading, error } = useGetExerciseByName();
    const {item, selectedExercises} = route.params
    
    console.log(`item: ${JSON.stringify(item)}`)
    console.log(`selectedExercises: ${JSON.stringify(selectedExercises)}`)
    const [exerciseInfo, setExerciseInfo] = useState({})

    const [sets, setSets] = useState(null)
    const [reps, setReps] = useState(null)
    const [distance, setDistance] = useState(null)
    const [duration, setDuration] = useState(null)
    const [weight, setWeight] = useState(null)
    const [calories, setCalories] = useState(null)
    const [warmUpSet, setWarmUpSet] = useState(false)

    const [snackbarVisible, setSnackbarVisible] = useState(false)


    useEffect(() => {
        async function fetchData() {
        const data = await getExerciseByName(item);
        setExerciseInfo(data)
        }
        fetchData()
    }, []);

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', backgroundColor: theme.background, alignContent: 'center', maxHeight: screenHeight}}>                

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', margin: 10}}>
                <Text style={{fontSize: 26, textAlign: 'left', fontWeight: 'bold', color: theme.color,  maxWidth: screenWidth * 0.7}}>{exerciseInfo.name ? exerciseInfo.name : "No name data"}</Text>
                <FAB 
                    label="Add"
                    style={{marginHorizontal: 5}}
                    onPress={() => {
                        if ((exerciseInfo.type === 'cardio' && calories != null && distance != null && duration != null) 
                        || (exerciseInfo.type != 'cardio' && calories != null && weight != null && reps != null && sets != null)) {
                            console.log(`These are the previous selected exercises: ${JSON.stringify(selectedExercises)}`)
                            let updatedSelectedExercises
                            if (selectedExercises) {
                                updatedSelectedExercises = selectedExercises.concat([{name: exerciseInfo.name, sets, reps, distance, duration, weight, calories, warmUpSet, type: exerciseInfo.type, muscle: exerciseInfo.muscle, difficulty: exerciseInfo.difficulty, instructions: exerciseInfo.instructions, equipment: exerciseInfo.equipment}]) 
                            } else {
                                updatedSelectedExercises = [{name: exerciseInfo.name, sets, reps, distance, duration, weight, calories, warmUpSet, type: exerciseInfo.type, muscle: exerciseInfo.muscle, difficulty: exerciseInfo.difficulty, instructions: exerciseInfo.instructions, equipment: exerciseInfo.equipment}]
                            }
                            console.log(`updated selected exercises: ${JSON.stringify(updatedSelectedExercises)}`)
                            navigation.navigate("Create New Workout", updatedSelectedExercises)
                        } else {
                            setSnackbarVisible(true)
                        }
                    }}
                />
            </View>

            <View style={{justifyContent: 'space-evenly'}}>
                <View style={{alignSelf: 'center', justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, margin: 10, width: screenWidth * 0.9, borderColor: theme.color}}>
                    <Text style={{textAlign: 'center', color: theme.color, fontSize: 12, paddingVertical: 5}}>Instructions</Text>
                    <ScrollView style={{maxHeight: screenHeight * 0.2}}>
                        <TouchableWithoutFeedback>
                            <Text style={{textAlign: 'justify', fontWeight: 'bold', color: theme.color, fontSize: 16 , textAlign:'center'}}>
                                {exerciseInfo.instructions ? exerciseInfo.instructions : "No instruction data"}
                            </Text>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>

                <View style={{alignSelf: 'center', justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, margin: 10, width: screenWidth * 0.9, borderColor: theme.color}}>
                    <View style={{justifyContent: 'space-evenly'}}>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Type</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>{exerciseInfo.type ? exerciseInfo.type : "No type data"}</Text>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Muscle</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>{exerciseInfo.muscle ? exerciseInfo.muscle : "No mucle data"}</Text>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Difficulty</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>{exerciseInfo.difficulty ? exerciseInfo.difficulty : "No difficulty data"}</Text>
                    </View>
                    <View style={{justifyContent: 'space-evenly'}}>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Equipment</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>{exerciseInfo.equipment ? exerciseInfo.equipment : "No equipment data"}</Text>
                    </View>
                </View>
            </View>
            <View style={{justifyContent: 'space-between', padding: 10}}>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: screenWidth * 0.8, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>     
                        <View style={{width: screenWidth * 0.4, flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center'}}>
                            <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>
                                {exerciseInfo.type != 'cardio' ?
                                <>
                                    <TextInput 
                                        style={[styles.textInput, {borderColor: theme.color, color: theme.color}]} 
                                        placeholder='Sets' 
                                        placeholderTextColor={theme.color}
                                        onChangeText={setSets}
                                        value={sets}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                                    <TextInput 
                                        style={[styles.textInput, {borderColor: theme.color, color: theme.color}]} 
                                        placeholder='Reps' 
                                        placeholderTextColor={theme.color}
                                        onChangeText={setReps}
                                        value={reps}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                                </>
                                :
                                <>
                                <View>
                                    <TextInput 
                                        style={[styles.textInput, {borderColor: theme.color, color: theme.color}]} 
                                        placeholder='Distance (km)' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={setDistance}
                                        value={distance}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                        />
                                </View>
                                <View>
                                    <TextInput 
                                        style={[styles.textInput, {borderColor: theme.color, color: theme.color}]} 
                                        placeholder='Duration (mins)' 
                                        placeholderTextColor={theme.color} 
                                        onChangeText={setDuration}
                                        value={duration}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                        />
                                </View>
                                </>
                                }
                            </View>

                            <View style={{width: screenWidth * 0.4, flexDirection: 'row', justifyContent: exerciseInfo.type != 'cardio' ? 'space-evenly' : 'center', alignContent: 'center'}}>
                                {exerciseInfo.type != 'cardio' &&
                                <>
                                    <TextInput 
                                        style={[styles.textInput, {borderColor: theme.color, alignSelf: 'center', color: theme.color}]} 
                                        placeholder='Weight (kg)' 
                                        placeholderTextColor={theme.color}
                                        onChangeText={setWeight}
                                        value={weight}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                                </>
                                }
                                    <TextInput 
                                        style={[styles.textInput, {borderColor: theme.color, alignSelf: 'center', color: theme.color}]} 
                                        placeholder='Calories (kcal)' 
                                        placeholderTextColor={theme.color}
                                        onChangeText={setCalories}
                                        value={calories}
                                        keyboardType={'numeric'} 
                                        textAlign={'center'}
                                    />
                            </View>
                        </View>

                        {exerciseInfo.type != 'cardio' &&
                            <View style={{width: screenWidth * 0.3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: theme.color, fontSize: 16, alignSelf: 'center', padding: 5, fontWeight: 'bold'}} onPress={() => {setWarmUpSet(!warmUpSet)}}>Warm Up Set</Text>

                                <Checkbox
                                    status={warmUpSet ? 'checked' : 'indeterminate'}
                                    onPress={() => {
                                        setWarmUpSet(!warmUpSet);
                                    }}
                                />
                                
                            </View>
                        }
                    </View>
                </View>
            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(!snackbarVisible)}
                action={{
                    label: 'Close',
                    onPress: () => {
                        setSnackbarVisible(!snackbarVisible)
                    },
                }}
                duration={3000}
                >
                Fields left empty!
            </Snackbar>
        </SafeAreaView>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
    textInput: { 
        borderRadius: 10, 
        borderWidth: 1, 
        margin: 5,
        width: screenWidth * 0.2, 
        height: screenHeight * 0.05,
        fontWeight: 'bold',
        fontSize: 10
    },
}
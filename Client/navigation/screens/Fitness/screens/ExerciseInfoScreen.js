import { StatusBar } from 'expo-status-bar';

import { Text, View, SafeAreaView, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import themeContext from '../../../theme/themeContext';
import { formikTrackExerciseForm } from '../forms/TrackExerciseForm';
import { useGetExerciseByName } from '../hooks/useGetExerciseByName';


export default function ExerciseInfoScreen({ route, navigation }) {
    const theme = useContext(themeContext)
    const { getExerciseByName, isLoading, error } = useGetExerciseByName();
    const {item, selectedExercises} = route.params
    const [exerciseInfo, setExerciseInfo] = useState({})

    useEffect(() => {
        async function fetchData() {
        const data = await getExerciseByName(item);
        setExerciseInfo(data)
        }
        fetchData()
    }, []);

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', backgroundColor: theme.background, alignContent: 'center', maxHeight: screenHeight}}>                

            <Text style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: theme.color}}>{exerciseInfo.name}</Text>

            <View style={{justifyContent: 'space-evenly'}}>
                <View style={{alignSelf: 'center', justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, margin: 10, width: screenWidth * 0.9, borderColor: theme.color}}>
                    <Text style={{textAlign: 'center', color: theme.color, fontSize: 12, paddingVertical: 5}}>Instructions</Text>
                    <ScrollView style={{maxHeight: screenHeight * 0.2}}>
                        <TouchableWithoutFeedback>
                            <Text style={{textAlign: 'justify', fontWeight: 'bold', color: theme.color, fontSize: 16 , textAlign:'center'}}>{exerciseInfo.instructions}</Text>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>

                <View style={{alignSelf: 'center', justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, margin: 10, width: screenWidth * 0.9, borderColor: theme.color}}>
                    <View style={{justifyContent: 'space-evenly'}}>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Type</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>{exerciseInfo.type}</Text>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Muscle</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>{exerciseInfo.muscle}</Text>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Difficulty</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>{exerciseInfo.difficulty}</Text>
                    </View>
                    <View style={{justifyContent: 'space-evenly'}}>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Equipment</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>{exerciseInfo.equipment}</Text>
                    </View>
                </View>
            </View>
            <View style={{justifyContent: 'space-between', padding: 10}}>
                {formikTrackExerciseForm({navigation, exerciseInfo})}
            </View>
        </SafeAreaView>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

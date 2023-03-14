import { StatusBar } from 'expo-status-bar';

import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import themeContext from '../../../theme/themeContext';
import { useGetAllWorkoutNames } from '../hooks/useGetAllWorkoutNames';
import { FAB, Provider, Portal } from "react-native-paper"
import { useIsFocused } from '@react-navigation/native';

export default function WorkoutPlansScreen({ navigation }) {
    const theme = useContext(themeContext)
    const { getAllWorkoutNames, isLoading, error } = useGetAllWorkoutNames();
    const [results, setResults] = useState([])
    const isFocused = useIsFocused();
    // const [isOpen, setIsOpen] = useState(false)

//     const [state, setState] = useState({ open: false });

//   const onStateChange = ({ open }) => setState({ open });

//   const { open } = state;
    
    useEffect(() => {
        async function fetchData() {
            const data = await getAllWorkoutNames();
            // console.log(`data: ${JSON.stringify(data)}`);
            let resultsList = [];

            data.map((item) => {
                resultsList.push(item);
            });
            setResults(resultsList);
        }
        fetchData()
    }, [navigation, isFocused])  

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>

            {/* <Text style={[styles.customWorkout, {color: theme.color}]}>Custom Workouts</Text> */}
        
            <ScrollView style={[styles.scrollView, {borderColor: theme.color}]} showsVerticalScrollIndicator={false} bounces={false} alignItems={'center'}>

                {error && <Text>{error}</Text>}
                {(results.length < 1) && <Text>You currently have no custom workout plans.</Text>}
                
                {results && results.map((item) => (
                    <TouchableOpacity key={item} onPress={() => {
                        navigation.navigate("Workout Plan Information", item)
                    }}> 
                        <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]} key={item}>{item}</Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
            <View>

                <FAB
                    icon="plus"
                    style={styles.fab}
                    label="Create Plan"
                    // animated={true}
                    onPress={() => {navigation.navigate('Create New Workout')}}
                />

                {/* <Provider>
                    <Portal>
                        <FAB.Group
                        open={open}
                        visible
                        icon={open ? 'cross' : 'plus'}
                        actions={[
                            { icon: 'plus', onPress: () => console.log('Pressed add') },
                            {
                            icon: 'star',
                            label: 'Star',
                            onPress: () => console.log('Pressed star'),
                            },
                            {
                            icon: 'email',
                            label: 'Email',
                            onPress: () => console.log('Pressed email'),
                            },
                            {
                            icon: 'bell',
                            label: 'Remind',
                            onPress: () => console.log('Pressed notifications'),
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                            // do something if the speed dial is open
                            }
                        }}
                        />
                    </Portal>
                </Provider> */}

                {/* <AnimatedFAB
                    icon={'plus'}
                    label={'Create Plan'}
                    extended={isExtended}
                    onPress={() => {navigation.navigate('Create New Workout')}}
                    visible={true}
                    animateFrom={'right'}
                    iconMode={'dynamic'}
                    style={styles.fab}
                /> */}

                {/* {GreenButton({height: screenHeight * 0.05, width: screenWidth * 0.15, fontSize: 20, text: "+", buttonFunction: () => {navigation.navigate('Create New Workout')}})} */}
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
    customWorkout: {
        fontSize: 22,
        margin: 10,
        fontWeight: "bold",
    },
    testText: {
        fontSize: 32,
        padding: 5,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        textAlign: 'center',
    },
    scrollView: {
        height: screenHeight * 0.2,
        borderWidth: 2,
        borderRadius: 26,
        paddingHorizontal: 16,
        margin: 10,
        width: screenWidth * 0.9
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    searchAndCreate: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-evenly'
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 12,
        flex: 1,
    },
    container: {
        alignItems: 'center',
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        left: screenWidth * 0.005,
        bottom: screenHeight * 0.005
    },
}

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
        width: screenWidth * 0.35, 
        height: screenHeight * 0.05,
        fontWeight: 'bold'
    },
}

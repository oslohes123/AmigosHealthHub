import { View, Text, SafeAreaView, TextInput, Button, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native'
import { useContext } from 'react'
import themeContext from '../../theme/themeContext'
import { IconButton } from 'react-native-paper'

export default function WorkoutPlanInfoScreen() {
    const theme = useContext(themeContext) 
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', maxHeight: screenHeight, alignItems:'center', paddingVertical: 10, backgroundColor: theme.background}}>
               
                <Text style={[styles.text, {color: theme.color}]}>Workout_Name</Text>

                <ScrollView alignContent={'center'} borderColor={theme.color} borderRadius={26} borderWidth={2} showsVerticalScrollIndicator={false} alignItems='center' style={{margin: 10, width: screenWidth * 0.9}}>
                    <TouchableWithoutFeedback style={{padding: 40}}>
                        <View style={[styles.exerciseSection, {borderColor: theme.color}]}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 20, padding: 5}}>Exercise Name</Text>
                                <IconButton icon="information" iconColor={theme.color} size={20} onPress={() => {setModalVisible(!modalVisible)}}/>
                            </View>
                            <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                <Text style={{color: theme.color, fontSize: 10}}>Muscle</Text>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>MUSCLE</Text>
                            </View>
                            <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                <Text style={{color: theme.color, fontSize: 10}}>Equiptment</Text>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>THIS, THAT, OTHER, THIS IS ALSO IN THE EQUIPTMENT LIST</Text>
                            </View>
                            <View style={styles.statsRows}>
                                <Text style={[styles.statsText, {color: theme.color}]}>Sets 0</Text>
                                <TextInput 
                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                    placeholder='Sets Completed' 
                                    color={theme.color}
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                    />
                            </View>
                            <View style={styles.statsRows}>
                                <Text style={[styles.statsText, {color: theme.color}]}>Reps 0</Text>
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
                                <Text style={[styles.statsText, {color: theme.color}]}>Calories 0</Text>
                                <TextInput 
                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                    placeholder='Reps Completed' 
                                    color={theme.color}
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{padding: 40}}>
                        <View style={[styles.exerciseSection, {borderColor: theme.color}]}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 20, padding: 5}}>Exercise Name</Text>
                                <IconButton icon="information" iconColor={theme.color} size={20} onPress={() => {setModalVisible(!modalVisible)}}/>
                            </View>
                            <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                <Text style={{color: theme.color, fontSize: 10}}>Muscle</Text>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>MUSCLE</Text>
                            </View>
                            <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                <Text style={{color: theme.color, fontSize: 10}}>Equiptment</Text>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>THIS, THAT, OTHER, THIS IS ALSO IN THE EQUIPTMENT LIST</Text>
                            </View>
                            <View style={styles.statsRows}>
                                <Text style={[styles.statsText, {color: theme.color}]}>Sets 0</Text>
                                <TextInput 
                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                    placeholder='Sets Completed' 
                                    color={theme.color}
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                    />
                            </View>
                            <View style={styles.statsRows}>
                                <Text style={[styles.statsText, {color: theme.color}]}>Reps 0</Text>
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
                                <Text style={[styles.statsText, {color: theme.color}]}>Calories 0</Text>
                                <TextInput 
                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                    placeholder='Reps Completed' 
                                    color={theme.color}
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{padding: 40}}>
                        <View style={[styles.exerciseSection, {borderColor: theme.color}]}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 20, padding: 5}}>Exercise Name</Text>
                                <IconButton icon="information" iconColor={theme.color} size={20} onPress={() => {setModalVisible(!modalVisible)}}/>
                            </View>
                            <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                <Text style={{color: theme.color, fontSize: 10}}>Muscle</Text>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>MUSCLE</Text>
                            </View>
                            <View style={{justifyContent: 'space-evenly', padding: 5}}>
                                <Text style={{color: theme.color, fontSize: 10}}>Equiptment</Text>
                                <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16}}>THIS, THAT, OTHER, THIS IS ALSO IN THE EQUIPTMENT LIST</Text>
                            </View>
                            <View style={styles.statsRows}>
                                <Text style={[styles.statsText, {color: theme.color}]}>Sets 0</Text>
                                <TextInput 
                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                    placeholder='Sets Completed' 
                                    color={theme.color}
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                    />
                            </View>
                            <View style={styles.statsRows}>
                                <Text style={[styles.statsText, {color: theme.color}]}>Reps 0</Text>
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
                                <Text style={[styles.statsText, {color: theme.color}]}>Calories 0</Text>
                                <TextInput 
                                    style={[styles.textInput, {borderColor: theme.color}]} 
                                    placeholder='Reps Completed' 
                                    color={theme.color}
                                    placeholderTextColor={theme.color} 
                                    keyboardType={'numeric'} 
                                    textAlign={'center'}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    
                </ScrollView>
                <View style={styles.bottomButtons}>
                    <Button title='Delete' onPress={() => {console.log("Button Pressed")}}/>
                    <Button title='Edit' onPress={() => {console.log("Button Pressed")}}/>
                    <Button title='Track' onPress={() => {console.log("Button Pressed")}}/>
                </View>
        </SafeAreaView>
    )
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
        width: screenWidth * 0.6, 
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        padding: 5
    }
}
import React, {useState, useContext} from 'react';
import { StyleSheet, View, Text, Switch, SafeAreaView, TextInput} from 'react-native';
// import NavBar from '../../components/NavBar';
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../../theme/themeContext';
import GreenButton from '../../components/GreenButton';
import theme from '../../theme/theme';

export default function Settings() {
    const theme = useContext(themeContext)
    const [darkMode, setDarkMode] = useState(false)

    const [showHeader, setShowHeader] = useState(false)
    
    const [goal, setGoal] = useState('');

    const handleButtonPress = () => {
        if (goal === '') {
            alert('Please enter new calorie goal');
        } else if (isNaN(goal)) {
            alert('Calorie should be a number');
        } else {
            setGoal('');
            alert('Calorie goal successfully added');
        }
    }
    
    return (
        <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
            
            <View style={styles.themeView}>
                <Text style={[styles.text, {color:theme.color}]}>Dark Mode</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={(value) => {
                            setDarkMode(value);
                            EventRegister.emit('ChangeTheme', value)
                        }}
                    />
            </View>
            
            <View style={styles.CalorieView}>
                <Text style={[styles.text, {color:theme.color}]}>Calories to goal</Text>
                <Switch
                    value={showHeader}
                    onValueChange={(value) => {
                        setShowHeader(value);
                        EventRegister.emit('ChangeHeader', value)
                    }}
                />
            </View>

            <View styles={styles.changeGoal}>
                <TextInput
                    placeholder='Add new calorie goal'
                    placeholderTextColor={theme.color}
                    style={[styles.input, {borderColor: theme.color}, {color: theme.color}]}
                    keyboardType="numeric"
                    value={goal}
                    onChangeText={setGoal}
                    clearButtonMode='always'
                />
                <GreenButton text='Set Goal' buttonFunction={handleButtonPress} height={60} width={220}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    themeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10%'
    },
    CalorieView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '10%'
    },
    text: {
        fontSize: 30
    },
    changeGoal: {
        
    },
    input: {
        alignSelf: 'center',
        marginTop: '15%',
        fontSize: 16,
        borderWidth: 1,
        padding: '3%',
        width: '70%',
        borderRadius: 25,
    }
})
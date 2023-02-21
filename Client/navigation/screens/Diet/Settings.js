import React, {useState, useContext} from 'react';
import { StyleSheet, View, Text, Switch, SafeAreaView} from 'react-native';
// import NavBar from '../../components/NavBar';
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../../theme/themeContext';

export default function Settings() {
    const theme = useContext(themeContext)
    const [darkMode, setDarkMode] = useState(false)
    
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    themeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10%'
    },
    text: {
        fontSize: 30
    },
    // nav: {
    //     position: 'absolute',
    //     top: 700,
    //     alignSelf: 'center'
    // }
})
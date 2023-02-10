import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

export default function FoodDetails({ route, navigation }) {

    const { name, calories, Protein, Carbs, Fat, Sugars, Vitamins, Fibre } = route.params
    console.log(route)

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{name}</Text>
            <View style={styles.box}>
                <Text style={styles.text}>Calories</Text>
                <Text style={styles.values}>{calories}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Protein</Text>
                <Text style={styles.values}>{Protein}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Carbs</Text>
                <Text style={styles.values}>{Carbs}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Fat</Text>
                <Text style={styles.values}>{Fat}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Sugars</Text>
                <Text style={styles.values}>{Sugars}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Vitamins</Text>
                <Text style={styles.values}>{Vitamins}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Fibre</Text>
                <Text style={styles.values}>{Fibre}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C1E3F',
    },
    header: {
        color: 'white',
        fontSize: 32,
        marginTop: 30,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    box: {
        flexDirection: 'row',
        marginTop: 50,
        marginLeft: 30,
    },
    text: {
        color: 'white',
        fontSize: 27
    },
    values: {
        color: 'white',
        fontSize: 20,
        //marginLeft: 165,
        borderWidth: 2,
        borderColor: 'white',
        padding: 5,
        borderRadius: 10,
        position: 'absolute',
        right: 30
    },
})


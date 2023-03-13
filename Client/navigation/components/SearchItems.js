import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchItems(item, searchFunction) {
    return (
        <TouchableOpacity onPress={(item) => searchFunction(item)} style={styles.textContainer} key={item.name}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textData} key={item.name}>{item.name}</Text>
                <Ionicons name={'chevron-forward-outline'} size={'32px'} color={'white'} />
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    textContainer: {
        backgroundColor: '#8bf2f3',
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        width: '80%',
        alignSelf: 'center',
        marginHorizontal: 10
    },
    textData: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    }
}
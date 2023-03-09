import { StatusBar } from 'expo-status-bar';

import { Text, View, SafeAreaView, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useContext } from 'react';
import themeContext from '../../theme/themeContext';
import { formikTrackExerciseForm } from './forms/TrackExerciseForm';


export default function ExerciseInfoScreen({ route, navigation }) {
    const theme = useContext(themeContext)
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', backgroundColor: theme.background, alignContent: 'center', maxHeight: screenHeight}}>                

            <Text style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: theme.color}}>Exercise_Name</Text>

            <View style={{justifyContent: 'space-evenly'}}>
                <View style={{alignSelf: 'center', justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, margin: 10, width: screenWidth * 0.9, borderColor: theme.color}}>
                    <Text style={{textAlign: 'center', color: theme.color, fontSize: 12, paddingVertical: 5}}>Instructions</Text>
                    <ScrollView style={{maxHeight: screenHeight * 0.2}}>
                        <TouchableWithoutFeedback>
                            <Text style={{textAlign: 'justify', fontWeight: 'bold', color: theme.color, fontSize: 16 , textAlign:'center'}}>Assume a shoulder-width stance, with knees inside the arms. Now while keeping the back flat, bend at the knees and hips so that you can grab the bar with the arms fully extended and a pronated grip that is slightly wider than shoulder width. Point the elbows out to sides. The bar should be close to the shins. Position the shoulders over or slightly ahead of the bar. Establish a flat back posture. This will be your starting position. Begin to pull the bar by extending the knees. Move your hips forward and raise the shoulders at the same rate while keeping the angle of the back constant; continue to lift the bar straight up while keeping it close to your body. As the bar passes the knee, extend at the ankles, knees, and hips forcefully, similar to a jumping motion. As you do so, continue to guide the bar with your hands, shrugging your shoulders and using the momentum from your movement to pull the bar as high as possible. The bar should travel close to your body, and you should keep your elbows out. At maximum elevation, your feet should clear the floor and you should start to pull yourself under the bar. The mechanics of this could change slightly, depending on the weight used. You should descend into a squatting position as you pull yourself under the bar. As the bar hits terminal height, rotate your elbows around and under the bar. Rack the bar across the front of the shoulders while keeping the torso erect and flexing the hips and knees to absorb the weight of the bar. Stand to full height, holding the bar in the clean position. Without moving your feet, press the bar overhead as you exhale. Lower the bar under control .</Text>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>

                <View style={{alignSelf: 'center', justifyContent: 'space-evenly', borderWidth: 2, borderRadius: 26, padding: 10, margin: 10, width: screenWidth * 0.9, borderColor: theme.color}}>
                    <View style={{justifyContent: 'space-evenly'}}>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Type</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>TYPENAME</Text>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Muscle</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>MUSCLE</Text>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Difficulty</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>0</Text>
                    </View>
                    <View style={{justifyContent: 'space-evenly'}}>
                        <Text style={{color: theme.color, fontSize: 12, textAlign:'center'}}>Equiptment</Text>
                        <Text style={{fontWeight: 'bold', color: theme.color, fontSize: 16, textAlign:'center'}}>THIS, THAT, OTHER, THIS IS ALSO IN THE EQUIPTMENT LIST</Text>
                    </View>
                </View>
            </View>
            <View style={{justifyContent: 'space-between', padding: 10}}>
                {formikTrackExerciseForm({navigation})}
            </View>
        </SafeAreaView>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

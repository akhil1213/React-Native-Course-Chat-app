import * as React  from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from "expo-constants";
import ListOfClasses from "./ClassList"
import AddClass from "./AddClass"

import { createStackNavigator } from '@react-navigation/stack';


const StackNavigator = createStackNavigator();
// https://stackoverflow.com/questions/32030050/how-can-you-float-right-in-react-native

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      className:'CS-381',
      profName:'Akhil Khanna',
      time:'01:30'
    },
    {
      id: "bd7acbea-c1b1-462-aed5-3ad53abb28ba",
      className:'CS-381',
      profName:'Akhil Khanna',
      time:'01:30'
    },
    {
      id: "bd7acbea-c1b1-46c2aed5-3ad53abb28ba",
      className:'CS-381',
      profName:'Akhil Khanna',
      time:'01:30'
    },
    
  ];

function ClassScreen({navigation}){
    const [classes,setClasses] = React.useState(DATA)
    return(
        <View style={styles.container}>
            <View style = {styles.topRight}>
                <TouchableOpacity onPress = {() => {navigation.navigate('AddClassModal',{setClasses})}}>
                    <MaterialCommunityIcons name="book-plus-multiple" size={48} />
                </TouchableOpacity>
            </View>
            <ListOfClasses classes={classes}/>
        </View>
    )
}
export default function ClassesScreen({navigation}) {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="ClassList" component ={ClassScreen}/>
            <StackNavigator.Screen name="AddClassModal" component ={AddClass}/>
        </StackNavigator.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
    topRight:{
        alignItems: 'flex-end'
    }
});
  
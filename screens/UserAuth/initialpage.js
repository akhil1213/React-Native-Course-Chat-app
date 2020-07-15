import  React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput,Button} from 'react-native';
import signup from './signup'
import login from './login'

import { createStackNavigator } from '@react-navigation/stack';


const StackNavigator = createStackNavigator();

function HomeScreen({navigation}){
    return (
        <View>
            <Button title="signup"onPress={()=>navigation.navigate('signup')}/>
            <Button title="login" onPress={()=>navigation.navigate('login')}/>
        </View>
    )
}
export default function InitialPage() {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="homepage" component={HomeScreen}/>
            <StackNavigator.Screen name="signup" component ={signup}/>
            <StackNavigator.Screen name="login" component ={login}/>
        </StackNavigator.Navigator>
    );
}
import  React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput,Button} from 'react-native';
import signup from './signup'
import login from './login'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { createStackNavigator } from '@react-navigation/stack';


const GET_CLASSES = gql`
  query {
    classes {
      coursename
    }
  }
`
const StackNavigator = createStackNavigator();

function HomeScreen({navigation}){
    return (
        <View>
            <Query query={GET_CLASSES}>
                {({ loading, error, data }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>error</Text>;
                    console.log(data)
                    console.log(error)
                    return (
                        <Button title={data.classes.coursename} />
                    )
                    }}
                </Query>
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
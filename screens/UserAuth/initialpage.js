import  React, {useEffect} from 'react';
import { StyleSheet, Text, View,TouchableHighlight, TextInput,Button, Image, ImageBackground} from 'react-native';
import signup from './signup'
import login from './login'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { createStackNavigator } from '@react-navigation/stack';
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";



const GET_CLASSES = gql`
  query {
    classes {
      coursename
    }
  }
`
const StackNavigator = createStackNavigator();

function HomeScreen({navigation}){
    // const { loading, error,data } = useQuery(GET_CLASSES);
    useEffect(()=>{
    })
    return (
    <ImageBackground source={require('../../assets/Images/initialpageBackground.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.name}>CourseChat</Text>
                <Text style={styles.description}>
                    Chat with your fellow classmates virtually and make study groups!
                </Text>
            </View>
            <View style={styles.buttons}>
                <TouchableHighlight underlayColor="#f5e942" style={styles.button} title="signup"onPress={()=>navigation.navigate('signup')}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5e942" style={styles.button} title="login" onPress={()=>navigation.navigate('login')}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
            </View>
        </View>
    </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:'center'
    },
    buttons:{
        marginBottom:'50px'
    },
    button:{
        backgroundColor:'#42c8f5',
        color:'white',
        fontWeight:'bold',
        marginTop:'7px',
        paddingHorizontal:100,
        paddingVertical:10
    },
    buttonText:{
        color:'white',
        fontWeight:'800'
    },
    descriptionContainer:{
        marginTop:'40px',
        textAlign:'center'
    },
    description:{
        color:'#ebe834',
        fontWeight:'900',
        fontSize:20,
        marginTop:'15px'
    },
    name:{
        color:'#ebe834',
        fontWeight:'900',
        fontSize:30
    },
    backgroundImage:{
        height: '100%',
        width: '100%'
    }
});
export default function InitialPage() {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen options={{headerShown: false}} name="homepage" component={HomeScreen}/>
            <StackNavigator.Screen options={{title:'',headerStyle: {backgroundColor: '#307ecc',borderBottomWidth: 0}}} name="signup" component ={signup}/>
            <StackNavigator.Screen options={{title:'',headerStyle: {backgroundColor: '#307ecc',shadowColor:'transparent',borderBottomColor:'transparent',borderBottomWidth: 0}}} name="login" component ={login}/>
        </StackNavigator.Navigator>
    );
}


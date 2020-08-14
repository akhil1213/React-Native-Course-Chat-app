import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput,Button} from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from '@apollo/client';
const GET_SIMILAR_CLASSES = gql`
    query studentsWithClasses($username:String!){
        studentsWithClasses(username:$username){
            classmate
            coursename
        }
    }
`
const GET_USER_INFO = gql`
    query UserInfo {
        userInfo {
            username
        }
    }
`

export default function SearchClassmates({navigation,route}) {
    const [classmateWithClasses, setClassmateWithClasses] = React.useState([])
    const client = useApolloClient()
    const username = client.readQuery({ 
        query: GET_USER_INFO
    }).userInfo.username
    const { loading, error,data } = useQuery(GET_SIMILAR_CLASSES,{
        variables:{ username:username },
    })
    if(loading)console.log(loading)
    else if(error)console.log(error)
    console.log(data)
    // for(const classmateWithClass in data.students)
    return (
        <View>
            <Text>SearchClassmates component!</Text>
        </View>
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


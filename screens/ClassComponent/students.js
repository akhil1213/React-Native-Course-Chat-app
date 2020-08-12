import * as React  from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Constants from "expo-constants";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from '@apollo/client';
const GET_STUDENTS = gql`
    query students($classname:String!){
        students(classname:$classname){
            username
        }
    }
`
export default function Students({route}){
    const {coursename} = route.params
    const { loading, error,data } = useQuery(GET_STUDENTS,{
        variables:{coursename}
    })
    console.log(data)
    return(
        <View style={styles.container}>
            <Text>Hey</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
    topRight:{
        alignItems: 'flex-end'
    }
});
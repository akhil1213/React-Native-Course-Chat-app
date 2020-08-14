import * as React  from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList} from 'react-native';
import Constants from "expo-constants";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from '@apollo/client';
const GET_CLASSMATES = gql`
    query students($classname:String!,$username:String!){
        students(classname:$classname,username:$username){
            username
        }
    }
`
export default function Students({route}){
    const {coursename,username} = route.params
    const { loading, error,data } = useQuery(GET_CLASSMATES,{
        variables:{ classname:coursename,username:username },//username parameter is unnecessary.
    })
    if(loading)return <View><Text>Loading!</Text></View>
    else if(error) console.log(error)
    console.log(data.students[0].username)
    const renderItem = (item) => (
        console.log(item),
        <TouchableOpacity>
            <View style={styles.item}>
                <Text style={styles.title}>{item.item.username}</Text>
            </View>
        </TouchableOpacity>
    );
    return(
        <View style={styles.container}>
            <FlatList
                data={data.students}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
    topRight:{
        alignItems: 'flex-end'
    },
    item: {
        borderBottomColor:'#c8c9cc',
        borderBottomWidth:2,
        padding: 35,
        marginVertical: 8,
        marginHorizontal: 16,
        textAlign:'center'
        // flexDirection:'row',
        // justifyContent:'space-between'
      },
    title: {
        fontSize: 18,
        fontWeight:'bold',
        color:'#33373d'
    },
});
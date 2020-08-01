
import React, { useState, useEffect } from 'react';

//Import all required component
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text
} from 'react-native';
import Constants from 'expo-constants'
import gql from "graphql-tag";
import { useApolloClient } from "@apollo/react-hooks";

const logoutQuery = gql`
  query UserInfo{
    userInfo{
      college
      token
    }
  }
`;

const SettingsScreen = () => {
    
    const client = useApolloClient();
    const logout = () => {
        
        /*this triggers the query on app.js and since logged
        in is false, user is only shown the UserAuth component*/
        // client.writeData({ data: { loggedIn:false } });
        // client.clearStore().then(() => {
        //     client.resetStore();
        //   });
        const data = client.readQuery({ query:logoutQuery });
        console.log(data)
        client.writeQuery({
            query:logoutQuery,
            data: {
              userInfo:{
                  token: null,
                  college:null,
                  loggedIn:false,
                  __typename:'userInfo'
              }
            },
        });
    }
    
    
    
    return (
        <View style={styles.container}>
            <TouchableHighlight underlayColor="#f5e942" style={styles.button} onPress={()=>logout()}>
                    <Text style={styles.buttonText}>Logout</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    button:{
        backgroundColor:'#42c8f5',
        color:'white',
        fontWeight:'bold',
        marginBottom:50,
        paddingHorizontal:100,
        paddingVertical:10
    },
    buttonText:{
        color:'white',
        fontWeight:'800'
    },
});
export default SettingsScreen;

// const styles = StyleSheet.create({
//     container: {
//         paddingTop: Constants.statusBarHeight,
//     },
// });
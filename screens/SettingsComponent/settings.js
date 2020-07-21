
import React, { useState, useEffect } from 'react';

//Import all required component
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import Constants from 'expo-constants'
import { useApolloClient} from "@apollo/react-hooks";




const SettingsScreen = () => {
    
    const client = useApolloClient();
    const logout = () => {
        console.log('hi!')
        console.log(client)
        
        /*this triggers the query on app.js and since logged
        in is false, user is only shown the UserAuth component*/
        client.writeData({ data: { loggedIn:false } });

        client.clearStore().then(() => {
            client.resetStore();
          });
    }
    
    
    
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={()=>logout()}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
});
export default SettingsScreen;

// const styles = StyleSheet.create({
//     container: {
//         paddingTop: Constants.statusBarHeight,
//     },
// });
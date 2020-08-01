import  React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View,TouchableHighlight, TextInput,Button, Image, ImageBackground} from 'react-native';
import InitialPage from './UserAuth/initialpage'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import gql from "graphql-tag";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import MyTabs from './tabs'
import { Query } from 'react-apollo';
import { ApolloProvider} from "@apollo/react-hooks";
const loginQuery = gql`
  query UserInfo{
    userInfo{
      college
      token
    }
  }
`;

const StackNavigator = createStackNavigator();

export default function LoadingPage({client}){
    const { loading, error,data } = useQuery(loginQuery);//this triggers only on mutation/writeQuery so when i logout
    const [userData,setUserData] = useState(null)
    // const client = useApolloClient();
    useEffect(()=>{
        if(data){
           console.log(data.userInfo.token) 
        }
        
        try{
            const user = client.readQuery({//readQuery triggers only when user opens/closes app so refresh
                //this reads from cache only on componentdidmount check if user is already logged in  
                query: gql`
                    query UserInfo{
                        userInfo{
                            token
                        }
                }
            `}).userInfo
            console.log(user.token)
            if(user.token)setUserData(user)
        }catch{
            setUserData(null)
        }
    })
    if(loading) return (<View><Text>Loading</Text></View>)
    /*
        if the user is logging in for the first time,
        then usequery will send data else 'readquery will send userData'
    */
    else if((userData && userData.token != null && !data) || (data && data.userInfo.token != null)){
        return(
            <ApolloProvider client={client}>
                <NavigationContainer>
                    <MyTabs />
                </NavigationContainer>
            </ApolloProvider>
        )
    }
        
    else{
        console.log(data)
        return(
            <NavigationContainer>
                <InitialPage/>
            </NavigationContainer>
        )
    }
}



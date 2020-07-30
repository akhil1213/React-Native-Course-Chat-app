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
    const { loading, error,data } = useQuery(loginQuery);//this triggers only on mutation
    const [userData,setUserData] = useState(null)
    // const client = useApolloClient();
    useEffect(()=>{
        try{
            const user = client.readQuery({
                //this reads from cache only on componentdidmount check if user is already logged in  
                query: gql`
                    query UserInfo{
                        userInfo{
                            token
                        }
                }
            `})
            setUserData(user)
        }catch{
            setUserData(null)
        }
        
        
    })
    if(loading) return (<View><Text>Loading</Text></View>)
    else if(userData) return(
        <ApolloProvider client={client}>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </ApolloProvider>
    )
    else{
        console.log(data)
        return(
            <NavigationContainer>
                <InitialPage/>
            </NavigationContainer>
        )
    }
}



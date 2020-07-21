import * as React from 'react';
import { useState, useEffect } from 'react'
import { Text, View , Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ClassScreen from './screens/ClassComponent/ClassScreen'
import AddClass from './screens/ClassComponent/AddClass'
import InitialPage from'./screens/UserAuth/initialpage'
// import { ApolloConsumer,ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client'
// import {  gql } from '@apollo/client';
// import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider} from "@apollo/react-hooks";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
// import gql from "graphql-tag";
import { gql, useQuery } from '@apollo/client';
import { Query } from 'react-apollo';
import HomeScreen from './screens/HomeComponent/home'
import SettingsScreen from './screens/SettingsComponent/settings'
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  cache,
  link
});

// const cache = new InMemoryCache()
// const client = new ApolloClient({
//   cache,
//   uri: 'http://localhost:4000/graphql',
//   typeDefs,
//   resolvers
// });
// export const typeDefs = gql`

//   extend type Mutation {
//     loginUser(username:String!, password:String!): String!
//   }
// `;
// export const resolvers = {};
// cache.writeData({
//   data: {
//     college:''
//   }
// });
const loggedIn = gql`
  query IsUserLoggedIn {
    loggedIn 
  }
`;


function MessageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Messages!</Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Classes"
        component={ClassScreen}
        options={{
          tabBarLabel: 'Classes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="teach" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="messages"
        component={MessageScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      

    </Tab.Navigator>
  );
}
export default function App() {
  // const { data, loading, error } = useQuery(college);
  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  useEffect(() => {
  });
  return(
    <ApolloProvider client={client}>
      <Query query={loggedIn}>
          {({ loading, error, data }) => {
              if(data && data.loggedIn){ //undefined.loggedIn throws error so check if data is not undefined first.
                  return(
                    <ApolloProvider client={client}>
                          <NavigationContainer>
                            <MyTabs />
                          </NavigationContainer>
                        </ApolloProvider>
                    )
              }
              return ( 
                <NavigationContainer>
                    <InitialPage/>
                </NavigationContainer>
              )
              }}
      </Query>
    </ApolloProvider>
    
  )
  ;
}
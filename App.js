import * as React from 'react';
import { useState, useEffect } from 'react'
// import { ApolloConsumer,ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client'
// import {  gql } from '@apollo/client';
// import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider} from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { gql, useQuery } from '@apollo/client';
import { AsyncStorage } from 'react-native';
import { persistCache } from 'apollo-cache-persist';
import LoadingPage from './screens/loadingpage'
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://192.168.1.51:4000/graphql"
});
persistCache({
  cache,
  storage: AsyncStorage,
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
    token 
  }
`;
export default function App() {
  // const { data, loading, error } = useQuery(college);
  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  useEffect(() => {
    // const client = useApolloClient();
    console.log(client)
  });
  const token = (token) =>{
    console.log(token)
  }
  return(
    <ApolloProvider client={client}>
      <LoadingPage client={client}/>
    </ApolloProvider>
  );
}
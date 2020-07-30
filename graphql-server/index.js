const { ApolloServer, gql } = require('apollo-server-express');
const db = require("./db.js")
const { signup } = require("./userauth/signup")
const { login } = require("./userauth/login")
// const { authorize } = require("./userauth/login")
const auth = require("./userauth/middleware/auth")
const express = require('express')
const cors = require('cors')
var { buildSchema } = require('graphql');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  type User{
    username:String
    password:String
    college:String
    id:String
    token:String
    password_digest:String
  }
  type Class {
    coursename: String
    profname: String
    time: String
    id: String
    createdBy: User
  }
  input RegisterUserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    classes: [Class]
  }
  type Mutation{
    createClass(coursename:String,profname:String,time:String):String
    signupUser(username:String, password:String, college:String ): User!
    loginUser(username:String, password:String): User!
    authorize(token:String):User!
  }
`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      classes: async () => {
        const classes = await db('class')
        console.log(classes)
        return classes
      }
    },
    Mutation:{
      createClass: async ( _,classObject ) => {
        console.log(classObject)
        const res = await db('class').insert(classObject)
        console.log(res)
        return res
      },
      signupUser:async(_, userObject ) => {
        console.log('signup beging triggered)')
        console.log(userObject)
        return signup(userObject)
      },
      loginUser:async(_,userObject) =>{
        console.log(userObject)
        return login(userObject)
      },
      authorize:async(_,{token}) =>{
        console.log(auth)
        return auth(token)
      }
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
// app.use(cors())
server.applyMiddleware({ app });
 
app.listen(4000, () =>
  console.log(`🚀 Server ready at http://192.168.2.62:4000${server.graphqlPath}`)
);




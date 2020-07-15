const { ApolloServer, gql } = require('apollo-server');
const db = require("./db.js")
const { signup } = require("./userauth")
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  type User{
    username:String
    password:String
    college:String
    id:String
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
        return signup(userObject)
      }
    }
};

const server = new ApolloServer({ 
  typeDefs,
   resolvers,
  context: ({ req }) => {
    // get the authorization from the request headers
    // return a context obj with our token. if any!
    const auth = req.headers.authorization || '';
    return {
      auth
    };
  } });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});



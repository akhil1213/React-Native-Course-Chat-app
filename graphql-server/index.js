const { ApolloServer, gql } = require('apollo-server');
const db = require("./db.js")
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  type Class {
    coursename: String
    profname: String
    time: String
    id: String
  }

  type Query {
    classes: [Class]
  }
  type Mutation{
    createClass(coursename:String,profname:String,time:String):String
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
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});



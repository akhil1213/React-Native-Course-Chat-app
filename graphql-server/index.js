const { ApolloServer, gql } = require("apollo-server-express");

const express = require("express");
const cors = require("cors");
var { buildSchema } = require("graphql");
const { typeDefs } = require("./typedefs");
const { resolvers } = require("./resolvers");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// query classes{
//   classes(username:"akhil1213"){
//     coursename
//   }
// }

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen(4000, () =>
  console.log(
    `🚀 Server ready at http://192.168.1.51:4000${server.graphqlPath}`
  )
);

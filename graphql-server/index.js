const { ApolloServer, gql } = require('apollo-server');
import client from './postgres'
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Class {
    courseName: String
    profName: String
    time: String
    id: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    classes: [Class]
  }
`;

const classes = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      className:'CS-381',
      profName:'Akhil Khanna',
      time:'01:30'
    },
    {
      id: "bd7acbea-c1b1-462-aed5-3ad53abb28ba",
      className:'CS-381',
      profName:'Akhil Khanna',
      time:'01:30'
    },
    {
      id: "bd7acbea-c1b1-46c2aed5-3ad53abb28ba",
      className:'CS-381',
      profName:'Akhil Khanna',
      time:'01:30'
    },
    
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      classes: () => client.,
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});



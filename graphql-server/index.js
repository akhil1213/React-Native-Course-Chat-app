import { ApolloServer, gql } from "apollo-server-express"
import express from "express"
import cors from "cors"
// import { typeDefs } from './typedefs'
import schema from './schema/makeSchema'
const startServer = async () => {
  const server = new ApolloServer({ schema });

  const app = express();
  app.use(cors());
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(
      `🚀 Server ready at http://localhost.com${server.graphqlPath}`
    )
  );
}

startServer();
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { typeDefs, resolvers } from './schema/index.js';

// newer version of apollo-server released - see docs https://www.apollographql.com/docs/apollo-server/integrations/middleware#apollo-server-express

async function startServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT || 3001;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // TODO - add the context with authmiddleware
  });

  await server.start();

  server.applyMiddleware({ app });
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // TODO - serve static assets, files, connect database

  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`API server running on port ${PORT}!`);
  console.log(
    `🚀 GraphQL server running on http://localhost:${PORT}${server.graphqlPath}`
  );
}

startServer(typeDefs, resolvers);

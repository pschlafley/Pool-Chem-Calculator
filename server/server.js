import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import process from 'process';

import { typeDefs, resolvers } from './schema/index.js';
import db from './config/connection.js';
import { authMiddleware } from './utils/auth.js';

// newer version of apollo-server released - see docs https://www.apollographql.com/docs/apollo-server/integrations/middleware#apollo-server-express

async function startServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT || 3001;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: { authMiddleware },
  });

  await server.start();

  server.applyMiddleware({ app });
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
  }

  app.get('*', (req, res) => {
    res.sendFile('../client/build/index.html');
  });

  db.once('open', async () => {
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));

    console.log(`API server running on port ${PORT}!`);
    console.log(
      `\n🚀 GraphQL server running on http://localhost:${PORT}${server.graphqlPath}\n`
    );
  });
}

startServer(typeDefs, resolvers);

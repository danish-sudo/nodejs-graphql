import express from "express";
import dotenv from "dotenv/config";

import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./graphql/resolvers/index.js";
import { MONGODB } from "./config.js";
import Mongopkg from "mongoose";

const { connect, set } = Mongopkg;

import typeDefs from "./graphql/typeDefs/index.js";

const startApolloServer = async () => {
  const app = express();

  let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });
  //   schema = applyMiddleware(schema, operationLoggerMiddleware, errorLogger);

  app.use((req, res) => {
    res.status(200);
    res.send("Hello!");
    res.end();
  });

  const port = 5001;
  set("strictQuery", false);

  connect(MONGODB, { useNewUrlParser: true }).then(async () => {
    console.log("Database Connected");
    // Now that our HTTP server is fully set up, we can listen to it.
    await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });

  return { server, app };
};

startApolloServer();

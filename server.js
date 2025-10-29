require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const start = async () => {
  const app = express();
  const port = process.env.PORT || 4000;

  // connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }

  // create Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.get("/", (req, res) => {
    res.send(`GraphQL server running. Open ${server.graphqlPath}`);
  });

  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

start();

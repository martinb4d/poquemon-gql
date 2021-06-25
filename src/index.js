require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PokemonAPI = require('./datasources/pokemon');
const BasementAPI = require('./datasources/basement');

const dataSources = () => ({
    PokemonAPI: new PokemonAPI(),
    BasementAPI: new BasementAPI()
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection: true,
    playground: true,
  });

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
  });
  
  module.exports = {
    dataSources,
    typeDefs,
    resolvers,
    ApolloServer,
    PokemonAPI,
    BasementAPI,
    server
  };
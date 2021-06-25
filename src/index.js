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

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
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
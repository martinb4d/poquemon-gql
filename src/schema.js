const { gql } = require('apollo-server');

const typeDefs = gql`
type Pokemon {
    name: String
    url: String
    picture: String
    moves: [Moves]
    types: [Types]
    owned: Owned
    nickname: String
    id: Int
  }

  type Moves {
    move: Move
  }

  type Move {
    name: String
    url: String
  }

  type Types {
    slot: String
    type: Type
  }

  type Type {
    name: String
    url: String
  }
  
  type Owned {
    total(name: String):Int
  }

  type Query {
    pokemons(limit: Int, offset: Int): [Pokemon]
    pokemon(name: String!): Pokemon
    basement(name: String): [Pokemon]
    basementSummary: [Pokemon]
  }

  type CatchResponse{
    id: Int
    respCode: String
    message: String
  }

  type Mutation {
    catchPokemon(name: String!, nickname: String, item: String!): CatchResponse!
    releasePokemon(id: Int!): String
  }
`;


module.exports = typeDefs;

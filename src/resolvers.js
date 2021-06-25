module.exports = {
    Query: {
        pokemons: (_, { limit, offset }, { dataSources }) =>
            dataSources.PokemonAPI.getAllPokemons({ limit: limit, offset: offset }),
        pokemon: (_, { name }, { dataSources }) =>
            dataSources.PokemonAPI.getPokemonByName({ name: name }),
        basement : (_, { name }, { dataSources }) =>
             dataSources.BasementAPI.getPokemons({ name: name }),
        basementSummary: (_, __, { dataSources }) =>
            dataSources.BasementAPI.getPokemonSummary(),
    },
    Pokemon: {
        owned:  (parent, __, { dataSources }) =>
        dataSources.BasementAPI.getOwnedPokemon({ name: parent.name })
    },
    Mutation: {
        catchPokemon: async (_, { name, nickname, item }, { dataSources }) => {
            const result = await dataSources.BasementAPI.catchPokemon({ name: name, nickname: nickname, item: item });
            if (result) {
                const resultTransform = {
                    respCode : result.respCode,
                    id : result.data?result.data.id:null,
                    message : result.data?result.data.message:result.message,
                }
                return resultTransform;
            }
        },
        releasePokemon: async (_, { id }, { dataSources }) => {
            const result = await dataSources.BasementAPI.releasePokemon({ id: id });
            if (result) {
                return result;
            }
        }
    },
};

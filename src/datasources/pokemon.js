const { RESTDataSource } = require('apollo-datasource-rest');

class PokemonAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://pokeapi.co/api/v2/';
    }

    pokemonReducer(pokemon) {
        return {
            name: pokemon.name,
            url: pokemon.url,
            picture: pokemon.sprites ? pokemon.sprites.front_default : null,
            moves: pokemon.moves,
            types: pokemon.types,
            owned: pokemon.name 
        };
    }

    async getAllPokemons({ limit, offset }) {
        var url = 'pokemon';
        if (limit) {
            url = `${url}?limit=${limit}&offset=${offset}`;
        }
        const response = await this.get(url);
        return Array.isArray(response.results)
            ? response.results.map(pokemon => this.pokemonReducer(pokemon))
            : [];
    }

    async getPokemonByName({ name }) {
        const response = await this.get(`pokemon/${name}`);
        return this.pokemonReducer(response);
    }
}

module.exports = PokemonAPI;

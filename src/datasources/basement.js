const { RESTDataSource } = require('apollo-datasource-rest');

class BasementAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://poquemon-be.herokuapp.com/';
    }

    pokemonReducer(pokemon, name) {
        return {
            name: name ? name : pokemon.name,
            url: pokemon.url,
            picture: pokemon.sprites ? pokemon.sprites.front_default : null,
            moves: pokemon.moves,
            types: pokemon.types,
            owned: pokemon.count ? pokemon.count : 1,
            nickname: pokemon.nickname,
            id: pokemon.id
        };
    }

    async getPokemons({ name }) {
        var url = 'pokemons/';
        if (name) {
            url = `${url}${name}`;
        }
        const response = await this.get(url);
        return Array.isArray(response.data)
            ? response.data.map(pokemon => this.pokemonReducer(pokemon))
            : [this.pokemonReducer(response.data, name)];
    }

    async getOwnedPokemon({ name }) {
         console.log(name);
        var url = 'pokemons/';
        if (name) {
            url = `${url}${name}`;
        }
        const response = await this.get(url);
        
        console.log(response.data);
        
        return  { total :  response.data ? response.data.count : 0 };
    }

    
    
    async getPokemonSummary() {
        const response = await this.get(`pokemons/all/summary`);
        return response.data.map(pokemon => this.pokemonReducer(pokemon));
    }

    async catchPokemon({ name, nickname, item }) {
        let body = {
            name,
            nickname,
            item
        }
        const response = await this.post(`pokemons`, body);
        
        return response;

    }

    async releasePokemon({ id }) {
        const response = await this.delete(`pokemons/${id}`);
        return response.message;
    }
}

module.exports = BasementAPI;

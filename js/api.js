const API_BASE = 'https://pokeapi.co/api/v2/pokemon/';

export async function fetchPokemonByName(name) {
    const response = await fetch(`${API_BASE}${name}`);
    if(!response.ok) throw Error('Pokemon not found');
    return await response.json();
}
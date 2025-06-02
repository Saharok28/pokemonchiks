import { fetchPokemonByName } from './api.js';
import { loadFavorites, saveFavorites, addFavorite, removeFavorite } from './favorites.js';
import { renderPokemonCard, renderFavorites, showMessage } from './ui.js';

const input = document.getElementById('pokemon-name-input');
const searchBtn = document.getElementById('search-button');
const infoDiv = document.getElementById('pokemon-info');
const favoritesDiv = document.getElementById('favorites-list');

let favorites = loadFavorites();
let currentPokemon = null;

renderFavoritesList();

searchBtn.addEventListener('click', async () => {
    const name = input.value.trim().toLowerCase();
    if (!name) {
        showMessage('Введіть імʼя покемона', true);
        return;
    }

    showMessage('Завантаження...');
    try {
        const data = await fetchPokemonByName(name);
        currentPokemon = data;

        const isFav = favorites.some(p => p.id == data.id);
        renderCurrentPokemon(data, isFav);
        showMessage('Знайдено!');
    } catch {
        showMessage('Покемон не знайдений', true);
    }
});

infoDiv.addEventListener('click', async (e) => {
    if (e.target.classList.contains('toggle-favorite')) {
        if (!currentPokemon) return;

        const isFav = favorites.some(p => p.id == currentPokemon.id);
        if (isFav) {
            favorites = removeFavorite(favorites, currentPokemon.id);
        } else {
            const types = currentPokemon.types.map(t => t.type.name).join(', ');
            const abilities = currentPokemon.abilities.map(a => a.ability.name).join(', ');
            const item = {
                id: currentPokemon.id,
                name: currentPokemon.name,
                imageUrl: currentPokemon.sprites.front_default,
                types,
                weight: (currentPokemon.weight * 0.1).toFixed(1),
                abilities
            };
            favorites = addFavorite(favorites, item);
        }

        saveFavorites(favorites);
        renderFavoritesList();

      
        renderCurrentPokemon(currentPokemon, !isFav);
    }
});

favoritesDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-favorite')) {
        const id = +e.target.dataset.id;
        favorites = removeFavorite(favorites, id);
        saveFavorites(favorites);
        renderFavoritesList();

      
        if (currentPokemon && currentPokemon.id === id) {
            renderCurrentPokemon(currentPokemon, false);
        }
    }
});

function renderFavoritesList() {
    favoritesDiv.innerHTML = renderFavorites(favorites);
}

function renderCurrentPokemon(pokemon, isFav) {
    infoDiv.innerHTML = renderPokemonCard(pokemon, isFav);
}

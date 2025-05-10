import { fetchPokemonByName } from './api.js';
import { loadFavorites, saveFavorites, addFavorite, removeFavorite } from './favorites.js';
import { renderPokemonCard, renderFavorites, showMessage } from './ui.js';

const input = document.getElementById('pokemon-name-input');
const searchBtn = document.getElementById('search-button');
const infoDiv = document.getElementById('pokemon-info');
const favoritesDiv = document.getElementById('favorites-list');

let favorites = loadFavorites();
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
        const isFav = favorites.some(p => p.id == data.id);
        infoDiv.innerHTML = renderPokemonCard(data, isFav);
        showMessage('Знайдено!');
    } catch {
        showMessage('Покемон не знайдений', true);
    }
});

infoDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-favorite')) {
        const id = +e.target.dataset.id;
        const name = input.value.trim().toLowerCase();

        const isFav = favorites.some(p => p.id == id);
        if (isFav) {
            favorites = removeFavorite(favorites, id);
        } else {
            fetchPokemonByName(name).then(pokemon => {
                const types = pokemon.types.map(t => t.type.name).join(', ');
                const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
                const item = {
                    id: pokemon.id,
                    name: pokemon.name,
                    imageUrl: pokemon.sprites.front_default,
                    types,
                    weight: (pokemon.weight * 0.1).toFixed(1),
                    abilities
                };
                favorites = addFavorite(favorites, item);
                renderFavoritesList();
            });
        }
        renderFavoritesList();
    }
});

favoritesDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-favorite')) {
        const id = +e.target.dataset.id;
        favorites = removeFavorite(favorites, id);
        renderFavoritesList();
    }
});

function renderFavoritesList() {
    favoritesDiv.innerHTML = renderFavorites(favorites);
}

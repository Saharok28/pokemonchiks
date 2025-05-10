export const pokemonInfoDiv = document.getElementById('pokemon-info');
export const favoritesListDiv = document.getElementById('favorites-list');
export const searchMessage = document.getElementById('search-message');

export function renderPokemonCard(pokemon, isFavorite) {
    const types = pokemon.types.map(t => t.type.name).join(', ');
    const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
    const weight = (pokemon.weight * 0.1).toFixed(1);

    return `
        <div class="pokemon-card">
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites.front_default}">
            <p>Тип: ${types}</p>
            <p>Вага: ${weight} кг</p>
            <p>Здібності: ${abilities}</p>
            <button class="toggle-favorite" data-id="${pokemon.id}">
                ${isFavorite ? '💔 Видалити' : '❤️ Улюблений'}
            </button>
        </div>
    `;
}
export function renderFavorites(favorites) {
    return favorites.map(pokemon => `
        <div class="favorite">
            <span>${pokemon.name}</span>
            <button class="remove-favorite" data-id="${pokemon.id}">Видалити</button>
        </div>
    `).join('');
}
export function showMessage(text, isError = false) {
    const msg = document.getElementById('search-message');
    msg.textContent = text;
    msg.style.color = isError ? 'red' : 'green';
}


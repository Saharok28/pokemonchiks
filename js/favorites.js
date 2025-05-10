const STORAGE_KEY = 'pokemonFavorites';

export function loadFavorites() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function addFavorite(favorites, pokemon) {
    if (!favorites.some(f => f.id === pokemon.id)) {
        favorites.push(pokemon);
        saveFavorites(favorites);
    }
    return favorites;
}

export function removeFavorite(favorites, id) {
    const updated = favorites.filter(p => p.id !== id);
    saveFavorites(updated);
    return updated;
}

async function showPokemons(limit = 12) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await response.json();

        const pokemons = data.results;

        displayPokemons(pokemons)
    }

    catch(error) {
        console.error(error)
    }

    function displayPokemons(pokemons) {
        const showPok = document.getElementById('showPok');
        showPok.innerHTML = "";

        pokemons.forEach(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const pokemonData = await response.json();
    
            const pokemonElement = document.createElement('div');
            pokemonElement.classList.add('pokemon');
            pokemonElement.innerHTML = `
                <h3>${pokemonData.name}</h3>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            `;
    
            showPok.appendChild(pokemonElement);
        });
    }
}

showPokemons()
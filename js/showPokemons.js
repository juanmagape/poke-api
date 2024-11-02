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
            
            pokemonElement.addEventListener('click', () => showPokemonDetails(pokemonData))
            showPok.appendChild(pokemonElement);
        });
    }

    function showPokemonDetails(pokemonData) {
        const modal = document.getElementById('pokemon-modal');
        const pokemonName = document.getElementById('pokemon-name');
        const pokemonImage = document.getElementById('pokemon-image');
        const pokemonInfo = document.getElementById('pokemon-info');

        pokemonName.textContent = pokemonData.name;
        pokemonImage.src = pokemonData.sprites.front_default;
        pokemonInfo.textContent = `Altura: ${pokemonData.height} - Peso: ${pokemonData.weight}`;

        modal.style.display = 'flex';
        document.body.classList.add('noScroll');
    }

    const closeModal = document.querySelector('.fa-x');
    closeModal.addEventListener('click', () => {
        document.getElementById('pokemon-modal').style.display = 'none';
        document.body.classList.remove('noScroll');
    })
}

showPokemons()
let offset = 0;
const limit = 12;
let isFetching = false;

async function showPokemons(offset = 0, limit = 12) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        const pokemons = data.results;

        displayPokemons(pokemons)
    }

    catch(error) {
        console.error(error)
    } finally {
        isFetching = false;
    }

    function displayPokemons(pokemons) {
        const showPok = document.getElementById('showPok');

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
        const pokemonStatsHead = document.querySelector('.pokemonStatsHead');
        const pokemonStatsBody = document.querySelector('.pokemonStatsBody');

        pokemonName.textContent = pokemonData.name;
        pokemonImage.src = pokemonData.sprites.front_default;
        pokemonInfo.textContent = `Altura: ${pokemonData.height} - Peso: ${pokemonData.weight}`;

        pokemonStatsHead.innerHTML = '';
        pokemonStatsBody.innerHTML = '';
            
            pokemonData.stats.forEach(stat => {
                pokemonStatsHead.innerHTML += `<th>${stat.stat.name}</th>`
                pokemonStatsBody.innerHTML += `<td>${stat.base_stat}</td>`
            });


        modal.style.display = 'flex';
        document.body.classList.add('noScroll');
    }

    const closeModal = document.querySelector('.fa-x');
    closeModal.addEventListener('click', () => {
        document.getElementById('pokemon-modal').style.display = 'none';
        document.body.classList.remove('noScroll');
    })

}



function loadMorePokemons() {
    if (!isFetching) {
        isFetching = true;
        offset += limit;
        showPokemons(offset, limit);
    }

}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetching) {
        loadMorePokemons();
    }
})


showPokemons(offset, limit)
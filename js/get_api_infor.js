async function getData() {
    try {
        const characterName = document.getElementById('searchCharacter').value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${characterName}`);

        const data = await response.json();
        const divDisplay = document.getElementById('divDisplay');
        const imgPokemon = document.getElementById('pokemonImage');
        const pokemonName = document.getElementById('pokemonName');
        const pokemonAbilities = document.getElementById('pokemonAbilities');
        const pokemonStats = document.getElementById('pokemonStats');
        console.log(data)
        
        if (characterName) {
            divDisplay.classList.remove('display-none');
            divDisplay.classList.add('display');
            imgPokemon.src = data.sprites.front_default;
            pokemonName.innerHTML = data.name;
            pokemonAbilities.innerHTML = "Pokemon type: " + data.types[0].type.name;
            pokemonStats.innerHTML = '';
            
            data.stats.forEach(stat => {
                pokemonStats.innerHTML += `
               
                    <th>${stat.stat.name}</th>
                    <td>${stat.base_stat}</td>
                `;
            });
        } 

    }

    catch(error) {
        const textError = document.getElementById('textError');

        textError.classList.remove('display-none');
        textError.classList.add('display');

        hideMessageError(textError);
    }

    async function hideMessageError(element) {

        await new Promise(resolve => setTimeout(resolve, 5000))
        element.classList.remove('display');
        element.classList.add('display-none');
    }
}
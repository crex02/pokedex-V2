let actualPageindex

getNextPage();

function getNextPage() {
    if (actualPageindex === undefined) {
        actualPageindex = 0;
    } else {
        actualPageindex++;
    }
    PokeService.getPage(actualPageindex).then(pokemons => {
        displayPokemons(pokemons);
    })
}

function getPreviousPage() {
    actualPageindex--;
    PokeService.getPage(actualPageindex).then(pokemons => {
        displayPokemons(pokemons);
    })
}

function displayPokemons(pokemons){
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = '';

    for (const pokemon of pokemons) {
        console.log(pokemon)

        pokemonContainer.innerHTML += `
        <details>
            <summary>
                <span>${pokemon.id}</span>
                <img class="list-img" src="${pokemon.sprites.front_default}" alt="">
                <span>${pokemon.name}</span>
                <div class="spacer"></div>
                ${pokemon.types.map(obj => `<span class="type">${obj.type.name}</span>`).join('')}
            </summary>
            <div>
                <ul>
                ${createAbilitiesList(pokemon)}
                </ul>
            </div>
        </details>
        `
    }
}

function createAbilitiesList(pokemon){
    let abilitiesHtml = '';
    for (const object of pokemon.abilities) {
        abilitiesHtml += `<li>${object.ability.name}</li>`
    }
    return abilitiesHtml;
}
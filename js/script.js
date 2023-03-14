const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

//Main 2 

const pokeCard = document.querySelector('[data-poke-card]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const botao = document.querySelector('[data-button]');
const main1 = document.querySelector('main');
const main2 = document.querySelector('.main2');
const verso = document.querySelector('.verso');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};
//Fim Main2
const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); /*Usamos o await para ele esperar a resposta do servidor (API) antes de prosseguir, ele só pode ser usado em funções assincronas por isso colocamos o async no começo da função*/
    if (APIResponse.status == 200){
        const data = await APIResponse.json(); /*Pegando os dados da resposta da API via json*/
        return data;
    }
}

const renderPokemon = async(pokemon) =>{
    pokemonName.innerHTML = 'loading....';
    pokemonNumber.innerHTML = '';
    

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];

        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonName.innerHTML = 'Not found:c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    renderPokemonData(input.value.toLowerCase())
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        renderPokemonData(searchPokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    renderPokemonData(searchPokemon);
});

//Main2

const renderPokemonData = async(pokemon) =>{
    const data = await fetchPokemon(pokemon);
    const sprite = data.sprites.front_default;
    const {stats, types} = data;

    pokeImg.setAttribute('src', sprite);
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types =>{
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '0.3rem 0.3rem';
}

const renderPokemonTypes = types =>{
    pokeTypes.innerHTML = '';
    types.forEach(type =>{
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats =>{
    pokeStats.innerHTML = '';
    stats.forEach(stat =>{
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

botao.addEventListener('click', () =>{

    if(main1.style.transform == ''){
    main2.style.transform = 'translateX(22rem)'
    main1.style.transform = 'translateX(-20rem)'
    verso.style.transform = 'rotateY(180deg)'
    botao.style.transform = 'rotateY(180deg)'
    }else{
    main2.style.transform = ''
    main1.style.transform = ''
    verso.style.transform = 'rotateY(150deg)'
    botao.style.transform = ''
    }
})

renderPokemon(searchPokemon);
renderPokemonData(searchPokemon);

//Fim Main 2
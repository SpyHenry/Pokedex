const pokeContainer = document.querySelector("#pokeContainer");
const loadMoreButton = document.getElementById("loadMoreButton");

const pokemonCount = 500;
const pageSize = 25; // quantidade de pokémon por página
let currentPage = 0;

const colors = {
    fire: '#e96565ff',
    grass: '#a8faadff',
    electric: '#fdda27ff',
    water: '#4cbbeeff',
    ground: '#ce945bff',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#bfd351ff',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#cccbcbff',
    fighting: '#888888ff',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemonsPage = async () => {
    const start = currentPage * pageSize + 1;
    const end = Math.min(start + pageSize - 1, pokemonCount);

    for (let i = start; i <= end; i++) {
        await getPokemon(i);
    }

    currentPage++;

    if (end >= pokemonCount) {
        loadMoreButton.style.display = "none"; // esconde botão ao acabar a "listagem"
    }
}

const getPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const resp = await fetch(url);
        const data = await resp.json();
        createPokemonCard(data);
    } catch (error) {
        console.error("Erro ao buscar Pokémon:", id, error);
    }
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(t => t.type.name);
    const type = mainTypes.find(t => pokeTypes.indexOf(t) > -1);
    const color = colors[type] || '#fff';
    const abilities = poke.abilities.map(a => a.ability.name).join(", ");

    card.innerHTML = `
    <div class="pokemon-inner">
      <div class="pokemon-front" style="background-color: ${color}">
        <div class="imgContainer">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${type}</span></small>
        </div>
      </div>

      <div class="pokemon-back" style="background-color: ${color}">
        <h3>${name}</h3>
        <p><strong>Tipo:</strong> ${type}</p>
        <p><strong>Habilidades:</strong> ${abilities}</p>
        <p><strong>Altura:</strong> ${poke.height/10} m</p>
        <p><strong>Peso:</strong> ${poke.weight/10} kg</p>
      </div>
    </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('flip'));
    pokeContainer.appendChild(card);
}

// Inicializa primeira página
fetchPokemonsPage();

loadMoreButton.addEventListener("click", fetchPokemonsPage);

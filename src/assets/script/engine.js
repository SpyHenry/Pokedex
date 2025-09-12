const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 500
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

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++){
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    creatPokemonCard(data)
}

const creatPokemonCard = (poke) => {
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

  console.log('Criando card:', name, '#'+id);

  card.addEventListener('click', (e) => {
    console.log('card clicado:', name, 'target:', e.target.tagName);
    card.classList.toggle('flip');
  });

  pokeContainer.appendChild(card);
}


fetchPokemons()
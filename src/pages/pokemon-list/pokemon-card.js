import { useHistory } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  const history = useHistory();

  const openPokemonDetail = (pokemonName) => {
    history.push(`/detail/${pokemonName}`);
  }

  return (
    <h1>
      <a href="#" onClick={() => openPokemonDetail(pokemon.name)}>{pokemon.name}</a>
    </h1>
  )
}

export default PokemonCard;
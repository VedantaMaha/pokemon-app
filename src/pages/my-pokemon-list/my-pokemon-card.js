import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from '../../context/app.context';
import pokeballOpen from '../../assets/pokeball-open.png';
import { css } from '@emotion/css';

const cardContainer = css({
  height: 'auto',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0 1px 6px 0 rgba(49,53,59,.12)',
  maxWidth: '200px',
  margin: '16px',
  padding: '16px',
  // mobile view
  '@media (max-width: 960px)': {
    maxWidth: '100px',
    margin: '4px',
    padding: '8px',
  }
})

const cardImage = css({
  height: '160px',
  // mobile view
  '@media (max-width: 960px)': {
    height: '80px'
  }
})

const cardTitle = css({
  marginTop: '1rem',
  fontWeight: '700',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  // mobile view
  '@media (max-width: 960px)': {
    fontSize: '14px'
  }
})

const ownedText = css({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFC107',
  textAlign: 'center',
  borderRadius: '1rem',
  color: 'rgba(0,0,0,.87)',
  fontWeight: '700',
  fontSize: '14px',
  padding: '8px',
  marginTop: '16px',
  // mobile view
  '@media (max-width: 960px)': {
    fontSize: '11px',
    padding: '8px',
    marginTop: '8px',
  }
})

const clickable = css({
  cursor: 'pointer'
})

const btnIcon = css({
  height: '4vmin'
})

function MyPokemonCard({ pokemon }) {
  const history = useHistory();
  const appContext = useContext(AppContext);

  const openPokemonDetail = () => {
    appContext.setSelectedPokemon(pokemon);
    history.push('/my-pokemon-list/detail');
  }

  const releasePokemon = (pokemonName) => {
    const pokemonRemaining = appContext.myPokemonList.filter(pokemon => pokemon.name !== pokemonName);
    appContext.setMyPokemonList(pokemonRemaining);
  }

  return (
    <div className={cardContainer}>
      <div className={clickable} onClick={() => openPokemonDetail()}>
        <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} className={cardImage} />
        <div className={cardTitle}>{pokemon?.name}</div>
      </div>
      <div className={ownedText} onClick={() => releasePokemon(pokemon?.name)}>
        <img src={pokeballOpen} alt="release pokemon" className={btnIcon} />
        <span>Release</span>
      </div>
    </div>
  )
}

export default MyPokemonCard;
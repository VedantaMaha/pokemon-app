import { useHistory } from 'react-router-dom';
import { css } from '@emotion/css';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/app.context';

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

const notOwnText = css({
  backgroundColor: '#e0e0e0',
  textAlign: 'center',
  borderRadius: '1rem',
  color: 'rgba(0,0,0,.87)',
  fontWeight: '700',
  fontSize: '14px',
  padding: '8px',
  marginTop: '16px',
  // mobile view
  '@media (max-width: 960px)': {
    fontSize: '9px',
    padding: '8px',
    marginTop: '8px',
  }
})

const ownedText = css({
  backgroundColor: 'rgb(3, 172, 14)',
  textAlign: 'center',
  borderRadius: '1rem',
  color: '#ffffff',
  fontWeight: '700',
  fontSize: '14px',
  padding: '8px',
  marginTop: '16px',
  // mobile view
  '@media (max-width: 960px)': {
    fontSize: '9px',
    padding: '8px',
    marginTop: '8px',
  }
})

const clickable = css({
  cursor: 'pointer'
})

function PokemonCard({ pokemon }) {
  const history = useHistory();
  const [ownedTotal, setOwnedTotal] = useState(0);
  const appContext = useContext(AppContext);

  useEffect(() => {
    const pokemonFounds = appContext.myPokemonList.filter(myPokemon => myPokemon.id === pokemon.id);
    setOwnedTotal(pokemonFounds ? pokemonFounds.length : 0);
    console.log('pokemonFounds ', pokemonFounds, appContext.myPokemonList);
  }, [appContext.myPokemonList])

  const openPokemonDetail = (pokemonName) => {
    history.push(`/detail/${pokemonName}`);
  }

  return (
    <div className={cardContainer}>
      <div className={clickable} onClick={() => openPokemonDetail(pokemon.name)}>
        <img src={pokemon?.image} alt={pokemon?.name} className={cardImage} />
        <div className={cardTitle}>{pokemon?.name}</div>
      </div>
      <div className={ownedTotal ? ownedText : notOwnText}>Owned: {ownedTotal}</div>
    </div>
  )
}

export default PokemonCard;
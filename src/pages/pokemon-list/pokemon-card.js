import { useHistory } from 'react-router-dom';
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

function PokemonCard({ pokemon }) {
  const history = useHistory();

  const openPokemonDetail = (pokemonName) => {
    history.push(`/detail/${pokemonName}`);
  }

  return (
    <div className={cardContainer}>
      <div onClick={() => openPokemonDetail(pokemon.name)}>
        <img src={pokemon?.image} alt={pokemon?.name} className={cardImage} />
        <div className={cardTitle}>{pokemon?.name}</div>
      </div>
      <div className={ownedText}>Owned: {0}</div>
    </div>
  )
}

export default PokemonCard;
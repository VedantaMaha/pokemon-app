import { useContext } from 'react';
import { css } from '@emotion/css';
import { AppContext } from '../../context/app.context';
import MyPokemonCard from './my-pokemon-card';
import PokemonEmpty from '../../components/pokemon-empty';

const container = css({
  margin: '1rem',
  '@media (max-width: 960px)': {
    marginBottom: '5rem'
  }
})

const cardContainer = css({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
})

function MyPokemonList() {
  const appContext = useContext(AppContext);

  // add condition when empty
  return (
    <>
    { !appContext?.myPokemonList?.length
      ? <PokemonEmpty />
      : <div className={container}>
        <div className={cardContainer}>
          { appContext?.myPokemonList?.map(pokemon => <MyPokemonCard key={pokemon?.name} pokemon={pokemon} />) }
        </div>
      </div>
    }
    </>
  )
}

export default MyPokemonList;
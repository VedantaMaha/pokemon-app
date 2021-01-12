import { useState } from 'react';
import { useQuery } from "@apollo/client";
import { POKEMON_LIST } from '../../graphql-queries/pokemon-list';
import PokemonLoading from '../../components/pokemon-loading';
import PokemonError from '../../components/pokemon-error';
import PokemonCard from './pokemon-card';
import { css } from '@emotion/css';
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

const buttonContainer = css({
  display: 'flex',
  justifyContent: 'center',
  margin: '2rem',
})

const button = css({
  cursor: 'pointer',
  padding: '1rem 2rem',
  backgroundColor: '#3f51b5',
  borderRadius: '2rem',
  color: '#ffffff',
  boxShadow: '2px 2px 6px -1px rgba(0,0,0,0.25)',
  fontWeight: '700',
  '@media (max-width: 960px)': {
    padding: '8px 16px'
  }
})

function PokemonList() {
  let offset = 0;
  const limit = 18;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(POKEMON_LIST, {
    variables: { limit, offset }
  });

  if (loading) {
    return <PokemonLoading />;
  }

  if (error) {
    return <PokemonError />;
  }

  const loadMorePokemon = async () => {
    setIsLoadingMore(true);
    offset = data.pokemons.nextOffset;
    await fetchMore({
      variables: { limit, offset }
    });
    setIsLoadingMore(false);
  }

  return (
    <>
    { !data?.pokemons?.results?.length
      ? <PokemonEmpty />
      : <div className={container}>
        <div className={cardContainer}>
          { data?.pokemons?.results.map(pokemon => <PokemonCard key={pokemon?.id} pokemon={pokemon} />) }
        </div>
        <div className={buttonContainer}>
          { isLoadingMore 
            ? <PokemonLoading />
            : <div className={button} onClick={() => loadMorePokemon()}>Load More</div>
          }
        </div>
      </div>
    }
    </>
  )
}

export default PokemonList;
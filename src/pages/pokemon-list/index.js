import { useState } from 'react';
import { useQuery } from "@apollo/client";
import { POKEMON_LIST } from '../../graphql-queries/pokemon-list';
import PokemonLoading from '../../components/pokemon-loading';
import Error from '../../components/pokemon-error';
import PokemonCard from './pokemon-card';

function PokemonList() {
  let offset = 0;
  const limit = 25;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(POKEMON_LIST, {
    variables: { limit, offset }
  });

  if (loading) {
    return <PokemonLoading />;
  }

  if (error) {
    return <Error />;
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
    <div>
      { data?.pokemons?.results.map(pokemon => <PokemonCard key={pokemon?.id} pokemon={pokemon} />) }
      { isLoadingMore 
        ? <PokemonLoading />
        : <button onClick={() => loadMorePokemon()}>Load more</button>
      }
    </div>
  )
}

export default PokemonList;
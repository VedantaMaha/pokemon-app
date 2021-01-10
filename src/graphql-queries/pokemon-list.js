import gql from "graphql-tag";

export const POKEMON_LIST = gql`
  query GetPokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      nextOffset
      results {
        name
        image
        id
      }
    }
  }
`;

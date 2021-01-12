import gql from "graphql-tag";

export const POKEMON_DETAIL = gql`
  query GetPokemonDetail($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        type {
          name
        }
      }
      sprites {
        front_default
        back_default
      }
      stats {
        base_stat
        stat {
          name
        }
      }
      moves {
        move {
          name
        }
      }
    }
  }
`;

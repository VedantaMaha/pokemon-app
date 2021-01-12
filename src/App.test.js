import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { POKEMON_LIST } from './graphql-queries/pokemon-list';
import PokemonList from './pages/pokemon-list';
import AppContextProvider from './context/app.context';
import { GraphQLError } from 'graphql';

const pokemonListMock = {
  request: {
    query: POKEMON_LIST,
    variables: {
      limit: 18,
      offset: 0
    },
  },
  result: {
    data: {
      pokemons: {
        nextOffset: 18,
        results: [
          {
            id: 1,
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            name: "bulbasaur"
          },
          {
            id: 2,
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            name: "ivysaur"
          }
        ]
      }
    },
  },
}

describe('Pokemon list page', () => {
  it('display loading screen', () => {
    render(
      <MockedProvider mocks={[pokemonListMock]} addTypename={false}>
        <AppContextProvider>
          <PokemonList />
        </AppContextProvider>
      </MockedProvider>
    );
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  })

  it('should render pokemon lists', async () => {
    render(
      <MockedProvider mocks={[pokemonListMock]} addTypename={false}>
      <AppContextProvider>
        <PokemonList />
      </AppContextProvider>
      </MockedProvider>
    );
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(screen.getByText('Load More')).toBeInTheDocument();
  })

  it('display error screen', async () => {
    const errorMock = {...pokemonListMock, result: {errors: [new GraphQLError('Error!')]}}
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
      <AppContextProvider>
        <PokemonList />
      </AppContextProvider>
      </MockedProvider>
    );
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(screen.getByText('Oh no! An error occured!')).toBeInTheDocument();
  })
})




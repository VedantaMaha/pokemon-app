import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import PokemonLoading from './components/pokemon-loading';
import { inMemoryCache } from './cache';
import AppContextProvider from './context/app.context';
import Header from './components/header';
import { Redirect } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: inMemoryCache
});

const PokemonList = lazy(() => import(/* webpackChunkName: "pokemon-list" */ './pages/pokemon-list'));
const PokemonDetail = lazy(() => import(/* webpackChunkName: "pokemon-detail" */ './pages/pokemon-detail'));
const MyPokemonList = lazy(() => import(/* webpackChunkName: "my-pokemon-list" */ './pages/my-pokemon-list'));
const CatchPokemonAction = lazy(() => import(/* webpackChunkName: "catch-pokemon-action" */ './pages/catch-pokemon-action'));

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <Router>
          <Header/>
          <Suspense fallback={<PokemonLoading />}>
            <Switch>
              <Route exact path="/" component={PokemonList} />
              <Route exact path="/detail/:pokemonName" component={PokemonDetail} />
              <Route exact path="/my-pokemon-list" component={MyPokemonList} />
              <Route exact path="/my-pokemon-list/detail" component={PokemonDetail} />
              <Route exact path="/catch-pokemon" component={CatchPokemonAction} />
              <Route render={() => <Redirect to={{pathname: "/"}} />} />
            </Switch>
          </Suspense>
        </Router>
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default App;
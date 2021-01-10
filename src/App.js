import './App.css';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import PokemonLoading from './components/pokemon-loading';
import { inMemoryCache } from './cache';
import AppContextProvider from './context/app.context';
import Header from './components/header';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: inMemoryCache
});

const PokemonList = lazy(() => import(/* webpackChunkName: "pokemon-list" */ './pages/pokemon-list'));

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <Router>
          <Header/>
          <Suspense fallback={<PokemonLoading />}>
            <Switch>
              <Route exact path="/" component={PokemonList} />
            </Switch>
          </Suspense>
        </Router>
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default App;
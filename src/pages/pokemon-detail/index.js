import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import { POKEMON_DETAIL } from '../../graphql-queries/pokemon-detail';
import PokemonLoading from '../../components/pokemon-loading';
import PokemonError from '../../components/pokemon-error';
import { css, keyframes } from '@emotion/css';
import pokeball from '../../assets/pokeball.png';
import pokeballOpened from '../../assets/pokeball-open.png';
import { AppContext } from '../../context/app.context';
import { useHistory } from 'react-router-dom';

const container = css({
  margin: '2rem 1rem',
  '@media (min-width: 960px)': {
    width: '60%',
    margin: '2rem auto'
  },
  '@media (max-width: 960px)': {
    marginBottom: '15rem'
  }
})

const imageContainer = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const image = css({
  backgroundColor: '#fafafa',
  borderRadius: '20rem',
  height: '240px'
})

const nameContainer = css({
  padding: '1rem',
  boxShadow: '0 1px 6px 0 rgba(49,53,59,.12)',
  textAlign: 'center',
  borderRadius: '5rem'
})

const pokemonNameText = css({
  margin: 0,
  fontSize: '32px',
  textTransform: 'capitalize',
  fontWeight: '700',
  color: 'rgba(0,0,0,.87)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const infoContainer = css({
  margin: '1rem 0',
  fontWeight: '700',
  backgroundColor: '#fafafa',
  padding: '10px 1rem 1rem',
  borderRadius: '10px'
})

const infoTitle = css({
  marginTop: '0',
  marginBottom: '8px',
  fontSize: '18px',
})

const infoData = css({
  textTransform: 'capitalize',
  fontSize: '18px',
})

const statsContainer = css({
  maxWidth: '500px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start'
})

const statsData = css({
  width: '230px',
  fontSize: '23px',
  margin: '10px',
  textTransform: 'capitalize',
  '@media (max-width: 960px)': {
    width: '128px',
    fontSize: '13px'
  }
})

const catchBtnContainer = css({
  cursor: 'pointer',
  position: 'fixed',
  right: '5vmin',
  bottom: '25vmin',
  padding: '1rem',
  borderRadius: '5rem',
  width: '65px',
  height: '65px',
  backgroundColor: '#FFC107',
  textAlign: 'center',
  fontWeight: '700',
  boxShadow: '2px 2px 6px -1px rgba(0,0,0,0.25)',
})

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -10px, 0);
  }
  70% {
    transform: translate3d(0, -6px, 0);
  }
  90% {
    transform: translate3d(0,-2px,0);
  }
`

function PokemonDetail() {
  const { pokemonName } = useParams();
  const history = useHistory();
  const appContext = useContext(AppContext);
  const location = useLocation();
  const isInMyPokemonDetailPage = location.pathname.includes('/my-pokemon-list/detail');
  const [pokemon, setPokemon] = useState(null);

  const { loading, error, data } = useQuery(POKEMON_DETAIL, {
    variables: { name: pokemonName },
    skip: isInMyPokemonDetailPage,
    onCompleted: () => {
      setPokemon(data.pokemon);
    }
  })

  useEffect(() => {
    if (isInMyPokemonDetailPage) {
      if (!appContext.selectedPokemon) {
        history.push('/');
        return;
      }
      setPokemon(appContext.selectedPokemon);
    }
  }, [])

  if (loading) {
    return <PokemonLoading />;
  }

  if (error) {
    return <PokemonError />;
  }

  const catchPokemon = () => {
    appContext.setSelectedPokemon(pokemon);
    history.push('/catch-pokemon');
  }

  const releasePokemon = () => {
    const pokemonsRemaining = appContext.myPokemonList.filter(myPokemon => myPokemon.name !== pokemon.name);
    appContext.setMyPokemonList(pokemonsRemaining);
    appContext.setSelectedPokemon(null);
    history.push('/release-pokemon');
  }

  return (
    <div className={container}>
      <div className={imageContainer}>
        <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} className={image} />
      </div>
      <div className={nameContainer}>
        <p className={pokemonNameText}>{pokemon?.name}</p>
      </div>
      <div className={infoContainer}>
        <p className={infoTitle}>Type:</p>
        {pokemon?.types?.map(({type}, typeIdx) => {
          return (
            <React.Fragment key={type?.name}>
            <span className={infoData}>{type?.name}</span>
            {(typeIdx !== pokemon?.types?.length - 1) ? <span className={infoData}> / </span> : <span></span>}
            </React.Fragment>
          )
        })}
      </div>
      <div className={infoContainer}>
        <p className={infoTitle}>Stats:</p>
        <div className={statsContainer}>
          {pokemon?.stats?.map(stat => {
            return (
              <div key={stat?.stat?.name} className={statsData}>{stat?.stat?.name}: {stat?.base_stat}</div>
            )
          })}
        </div>
      </div>
      <div className={infoContainer}>
        <p className={infoTitle}>Moves:</p>
        <div className={statsContainer}>
          {pokemon?.moves?.map(({move}) => {
            return (
              <div key={move?.name} className={statsData}>{move?.name}</div>
            )
          })}
        </div>
      </div>

      <div className={catchBtnContainer} onClick={() => isInMyPokemonDetailPage ? releasePokemon() : catchPokemon()}>
        <img
          className={css`
            width: 40px;
            height: 40px;
            border-radius: 50%;
            animation: ${bounce} 1s ease infinite;
            transform-origin: center bottom;
          `}
          src={isInMyPokemonDetailPage ? pokeballOpened : pokeball}
          alt="Catch Pokemon"
        />
        <div className={infoData}>{isInMyPokemonDetailPage ? 'Release' : 'Catch!'}</div>
      </div>
    </div>
  )
}

export default PokemonDetail;
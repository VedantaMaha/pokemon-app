import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { css } from '@emotion/css';
import ashFight from '../../assets/ash-fight.png';
import arrowRight from '../../assets/arrow-right-circle.png';
import arrowLeft from '../../assets/arrow-left-circle.png';
import { useHistory } from 'react-router-dom';

const container = css({
  margin: '5rem 1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})

const imageContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '500px',
  '@media (max-width: 960px)': {
    width: '100%'
  }
})

const image = css({
  width: '150px'
})

const headerTxt = css({
  marginTop: '1rem',
  marginBottom: '8px',
  fontWeight: '700',
  fontSize: '32px',
  textAlign: 'center'
})

const infoTxt = css({
  margin: 0,
  textAlign: 'center',
  fontWeight: '700',
  fontSize: '20px'
})

const actionBtn = css({
  cursor: 'pointer',
  padding: '12px',
  margin: '1rem',
  backgroundColor: '#FFC107',
  borderRadius: '8px',
  color: '#ffffff',
  boxShadow: '2px 2px 6px -1px rgba(0,0,0,0.25)'
})

const btnIcon = css({
  width: '30px'
})

const nameInput = css({
  width: '250px',
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '10px',
  textAlign: 'center',
  textTransform: 'capitalize',
  fontWeight: '700',
  fontSize: '18px',
  border: 0,
  backgroundColor: 'white',
  boxShadow: '0 1px 6px 0 rgba(49,53,59,.12)'
})

const errorMessage = css({
  color: 'red',
  margin: '1rem auto',
  textAlign: 'center'
})

function CatchPokemonAction() {
  const history = useHistory();
  const appContext = useContext(AppContext);

  const [isPokemonCaught, setIsPokemonCaught] = useState(null);
  useEffect(() => {
    if (!appContext.selectedPokemon) {
      history.push('/');
    }
    setIsPokemonCaught(Math.random() >= 0.5);
  }, []);

  const [isNameTaken, setIsNameTaken] = useState(false);
  const setPokemonName = (pokemonName) => {
    const sameNamedPokemonFound = appContext.myPokemonList.find(pokemon => pokemon.name === pokemonName);
    if (sameNamedPokemonFound) {
      setIsNameTaken(true);
    } else {
      appContext.setSelectedPokemon({
        ...appContext.selectedPokemon,
        name: pokemonName
      })
      setIsNameTaken(false);
    }
  }

  const goHome = () => {
    history.push('/');
  }

  const goToPokemonDetail = () => {
    if (!isNameTaken) {
      appContext.setMyPokemonList([...appContext.myPokemonList, appContext.selectedPokemon]);
      history.push('/my-pokemon-list/detail');
    } else {
      history.push('/');
    }
  }
  
  return (
    <div className={container}>
      { isPokemonCaught
        ? <>
          <div className={imageContainer}>
            <img src={ashFight} alt="ash fighting" className={image} />
            <img src={appContext?.selectedPokemon?.sprites?.front_default} alt="pokemon get" className={image} />
          </div>
          <p className={headerTxt}>Congratulation!</p>
          <p className={infoTxt}>Lets give our pokemon a name</p>
          <input
            className={nameInput}
            type="text"
            value={appContext?.selectedPokemon?.name}
            onChange={(e) => setPokemonName(e.target.value)}
          />
          { isNameTaken ? <p className={errorMessage}>Pokemon name already taken.</p> : ''}
          <div className={actionBtn} onClick={() => goToPokemonDetail()}>
            <img className={btnIcon} src={arrowRight} alt="go to pokemon detail page"/>
          </div>
        </>
        : <>
          <div className={imageContainer}>
            <img src={ashFight} alt="ash fighting" className={image} />
            <img src={appContext?.selectedPokemon?.sprites?.back_default} alt="pokemon run" className={image} />
          </div>
          <p className={headerTxt}>Ohh nooo!!</p>
          <p className={infoTxt}>{appContext?.selectedPokemon?.name} is running awayy...</p>
          <div className={actionBtn} onClick={() => goHome()}>
            <img className={btnIcon} src={arrowLeft} alt="go to home page" />
          </div>
        </>
      }
    </div>
  )
}

export default CatchPokemonAction;
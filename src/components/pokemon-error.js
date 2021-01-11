import pokemonSad from '../assets/pokemon-error.png'
import { css } from '@emotion/css'

const loadingContainer = css({
  width: '100%',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})

const infoText = css({
  fontWeight: '700',
  fontSize: '2rem',
  color: 'rgba(0,0,0,.87)',
  margin: '1rem',
  textAlign: 'center'
})

function PokemonError() {
  return (
    <div className={loadingContainer}>
      <img
        src={pokemonSad}
        className={css`
          height: 150px;
        `}
        alt="Error occured"
      />
      <p className={infoText}>Oh no! An error occured!</p>
    </div>
  )
}

export default PokemonError;
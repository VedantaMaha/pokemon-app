import { css } from '@emotion/css';
import ashRelease from '../../assets/ash-release.jpg';

const container = css({
  margin: '5rem 1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
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

function ReleasePokemonAction() {
  // release
  return (
    <div className={container}>
      <img src={ashRelease} alt="release pokemon"/>
      <p className={headerTxt}>Bye bye friend!</p>
      <p className={infoTxt}>I am not crying... 😢</p>
    </div>
  )
}

export default ReleasePokemonAction;
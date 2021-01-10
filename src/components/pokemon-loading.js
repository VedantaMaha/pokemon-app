import pokeball from '../assets/pokeball.png'
import { css, keyframes } from '@emotion/css'

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

function PokemonLoading() {
  return (
    <img
      className={css`
        width: 96px;
        height: 96px;
        border-radius: 50%;
        animation: ${bounce} 1s ease infinite;
        transform-origin: center bottom;
      `}
      src={pokeball}
    />
  )
}

export default PokemonLoading;
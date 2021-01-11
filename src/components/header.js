import { css } from '@emotion/css';
import pokemonLogo from '../assets/pokemon-logo.png';
import { NavLink } from 'react-router-dom'

const navDesktop = css({
  backgroundColor: '#ffffff',
  zIndex: 999,
  boxShadow: '0 4px 6px -1px rgba(0,0,0,.07)',
  // dont display this navbar on screen that are 961px or less
  '@media (max-width: 961px)': {
    display: 'none'
  }
})

const navDesktopContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const navMobile = css({
  backgroundColor: '#ffffff',
  zIndex: 999,
  position: 'fixed',
  bottom: 0,
  width: '100%',
  // dont display this navbar on screen that are 960px or more
  '@media (min-width: 960px)': {
    display: 'none'
  }
})

const navMobileContainer = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
})

const logo = css({
  height: '45px',
  margin: '10px 1rem'
})

const menuList = css({
  display: 'flex',
  listStyle: 'none',
  textAlign: 'center',
  marginRight: '1rem',
  // for mobile view
  '@media (max-width: 960px)': {
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
    width: '100%',
    height: '60px',
    alignItems: 'center',
    boxShadow: '0 -7px 6px -1px rgba(0,0,0,.07)',
  }
})

const menuItem = css({
  fontSize: '23px',
  textDecoration: 'none',
  color: 'rgba(49, 53, 59, 0.96)',
  fontWeight: '700'
})

const activeNav = css({
  color: '#FFC107'
})

function Header() {
  return (
    <>
    {/* desktop navbar */}
    <nav className={navDesktop}>
      <div className={navDesktopContainer}>
        <NavLink to="/">
          <img src={pokemonLogo} alt="pokemon logo" className={logo} />
        </NavLink>
        <ul className={menuList}>
          <li className={css`width: 200px`}>
            <NavLink exact to="/" className={menuItem} activeClassName={activeNav}>Explore</NavLink>
          </li>
          <li className={css`width: 200px`}>
            <NavLink exact to="/my-pokemon-list" className={menuItem} activeClassName={activeNav}>My Pokemon List</NavLink>
          </li>
        </ul>
      </div>
    </nav>

    {/* mobile navbar */}
    <nav className={navMobile}>
      <div className={navMobileContainer}>
      <ul className={menuList}>
        <li>
          <NavLink exact to="/" className={menuItem} activeClassName={activeNav}>Explore</NavLink>
        </li>
        <li>
          <NavLink exact to="/my-pokemon-list" className={menuItem} activeClassName={activeNav}>My Pokemon List</NavLink>
        </li>
      </ul>
      </div>
    </nav>
    </>
  )
}

export default Header;
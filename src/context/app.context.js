import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [myPokemonList, setMyPokemonList] = useState(
    JSON.parse(localStorage.getItem('myPokemonList')) ?? []
  );

  return (
    <AppContext.Provider value={{
      myPokemonList,
      setMyPokemonList,
      selectedPokemon,
      setSelectedPokemon
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [myPokemonList, setMyPokemonList] = useState(
    JSON.parse(localStorage.getItem('myPokemonList')) ?? []
  );
  useEffect(() => {
    localStorage.setItem('myPokemonList', JSON.stringify(myPokemonList));
  }, [myPokemonList])

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
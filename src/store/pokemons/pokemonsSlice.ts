//'rxslice' EL SNIPET PARA CREAR TODA LA ESTRUCTURA
import { createSlice } from '@reduxjs/toolkit'
import { SimplePokemon } from 'Q/app/pokemons';


interface PokemonState {
    [key: string]: SimplePokemon | {}
}

const storedStateString = localStorage.getItem('favorite-pokemons');
const initialState: PokemonState = storedStateString ? JSON.parse(storedStateString) : {};



const pokemonSlice: any = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

    // LAS FUNCIONES DEBEN SER PURAS, NO DEBEN MODIFICAR NADA QUE NO SEA EL ESTADO!
    // NO PUEDE MODIFICAR NADA DEL AFUERA DEL SLICE, POR EJ
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload 

      //si es verdadero
      if(!!state[pokemon.id]){
        delete state[pokemon.id]
        return
      } else {
      //SI NO EXISTE, LO AGREGO
      state[pokemon.id] = pokemon
      }

      //TODO - ESTO NO ES PURO PARA LA FUNCIÓN, NO SE DEBE HACER EN REDUX PERO ES UNA FORMA (NO RECOMENDADA)
      localStorage.setItem('favorite-pokemons', JSON.stringify(state))
      //TODO - DE TODOS MODOS, EN NEXT EL PROBLEMA DEL LS, ES CUANDO YO RENDERIZO ALGO EN EL HTML A PARTIR DEL LS, AHÍ DA PROBLEMAS, MAS ADELANTE PUEDO USAR COOKIES POR EJEMPLO



    }
  }
});

// Almacenamiento en memoria del servidor (Server Memory): Si los datos se almacenan en la memoria del servidor,
//  generalmente se pierden cuando se recarga la página, ya que cada solicitud al servidor se trata como una nueva instancia de la aplicación.
//  Cada vez que se recarga la página, la aplicación vuelve a iniciar desde cero y los datos en memoria se reinician.

// Almacenamiento en memoria del cliente (Client Memory): Si los datos se almacenan en la memoria del cliente,
//  como en variables JavaScript, el almacenamiento local (localStorage) o el almacenamiento de sesión (sessionStorage),
//  estos datos persistirán incluso después de recargar la página. Por ejemplo, si guardas datos en el almacenamiento local usando localStorage.setItem(),
//  estos datos permanecerán disponibles incluso después de que se cierre y vuelva a abrir el navegador.

export const { toggleFavorite } = pokemonSlice.actions

export default pokemonSlice.reducer
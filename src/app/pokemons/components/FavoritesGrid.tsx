'use client'
import { useAppSelector } from 'Q/store';
import { SimplePokemon } from '../interfaces/simple-pokemon';
import PokemonGrid from './PokemonGrid';
import { IoHeartOutline } from 'react-icons/io5';

interface Props {
    pokemons: SimplePokemon[]
}

//ME DEVUELVE UN ARRAY CON TODOS LOS VALORES DE LAS KEY, SOLO LOS VALORES.


const FavoritesGrid = () => {

  const myFavorites = useAppSelector((state) => Object.values(state.pokemons));


  return (
    <>
        { 
            myFavorites.length > 0
                ? <PokemonGrid pokemons={myFavorites} /> 
                : <NoFavorites/>
        }
    </>
        
 
  )
}

export default FavoritesGrid

export const NoFavorites = () => {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center ">
        <IoHeartOutline size={100} className="text-red-500" />
        <span>No hay favoritos</span>
      </div>
    )
  }
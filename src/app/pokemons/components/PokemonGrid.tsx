import React, { Component } from 'react'
import { SimplePokemon } from '../interfaces/simple-pokemon';
import Image from 'next/image';
import PokemonCard from './PokemonCard';

interface Props {
    pokemons: SimplePokemon[]
}



const PokemonGrid = ({ pokemons }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-center">
        {
          pokemons.map((poke) => (
          //nos deja cargar bajo demanda el componente image de Next
          <PokemonCard
                key={parseInt(poke.id)}
                pokemonKey={parseInt(poke.id)}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke.id}.svg`}
                name={poke.name}
                width={100}
                height={100}
          />
          
          ))
          }
    </div>
  )
}

export default PokemonGrid
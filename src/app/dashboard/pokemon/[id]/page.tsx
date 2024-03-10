
import { Pokemon } from "Q/app/pokemons/interfaces/pokemon"
import { Metadata } from "next";
import Image from "next/image"
import { notFound } from "next/navigation"
import { useEffect } from "react";

interface Props {
  params: {id: string}
}


export async function generateMetadata({ params }:Props): Promise<Metadata> {

  try {
    const { id, name } = await getPokemon(params.id);
  
    return {
      title: `#${ id } - ${ name }`,
      description: `Página del pokémon ${ name }`
    }
    
  } catch (error) {
    return {
      title: 'Página del pokémon',
      description: 'Culpa cupidatat ipsum magna reprehenderit ex tempor sint ad minim reprehenderit consequat sit.'
    }
  }
}


// DEVUELVE UNA PROMESA QUE ES POKEMON
const getPokemon = async (id: string): Promise<Pokemon> => {

  try {
    const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    // ,  cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 30 * 6
    }
  }) // TODO: CAMBIAR ESTO EN UN FUTURO 
  .then(res => res.json())
    //f1 --> debug npm script --> y elijo dev
    // console.log('Se cargo:' pokemon)
    return pokemon

  } catch {
    //SI FALLA Y HAY UN ERROR, ME VA A LLEVAR POR DEFECTO AL NOUTFOUND
    notFound()
  }


}


//NOMBRE OBLIGATORIO DE FUNCION OBLIGATORIO -solo se va a generar en build time-
export async function generateStaticParams() {

  let staticPokemons = Array.from({length: 151}).map((v, i) => (i + 1))


  //Tenemos que devolver un array con los mismos parametros del componente, el array por ej, que tenga la cantidad que queramos generar de manera estatica
  return staticPokemons.map((value) => {
    id: value
  })
}





//PARARMS ES UN OBJETO, DOS MANERAS DE TIPARLO
// const PokemonPage = ( params: {id: string} ) => {
const PokemonPage = async ( {params}: Props ) => {

  const pokemon = await getPokemon(params.id)


  return (
    <>
      <h1 className="text-4xl stroke-orange-700">{pokemon.forms[0].name} </h1>
      <h2>Habilidades:</h2>
      <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
      </ul>
      <div>
      <Image
        alt={'poke'}
        width={100}
        height={100}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
      />
       
      </div>
    </>
  )
}

export default PokemonPage

import { Pokemon } from "Q/app/pokemons/interfaces/pokemon"
import Image from "next/image"

interface Props {
  params: {id: string}
}

// DEVUELVE UNA PROMESA QUE ES POKEMON
const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: "force-cache"}) // TODO: CAMBIAR ESTO EN UN FUTURO 
  .then(res => res.json())
  //f1 --> debug npm script --> y elijo dev
  // console.log('Se cargo:' pokemon)

  return pokemon
}


export const metadata = {
 title: 'SEO Title',
 description: 'SEO Title',
};

let dataPoke = null

//PARARMS ES UN OBJETO, DOS MANERAS DE TIPARLO
// const PokemonPage = ( params: {id: string} ) => {
const PokemonPage = async ( {params}: Props ) => {
  
  const pokemon = await getPokemon(params.id)

  return (
    <>
      <h1 className="text-4xl stroke-orange-700">{pokemon.forms[0].name} </h1>
      <h2>Habilidad: {pokemon.abilities.map((ability:string) => ability.ability.name)};</h2>
      <div>
      <Image
        alt={'poke'}
        width={100}
        height={100}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${params.id}.svg`}
      />
       
      </div>
    </>
  )
}

export default PokemonPage
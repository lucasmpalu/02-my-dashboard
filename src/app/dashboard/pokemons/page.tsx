import { PokemonsResponse, SimplePokemon } from "Q/app/pokemons"
import PokemonGrid from "Q/app/pokemons/components/PokemonGrid"
import Image from "next/image"

//VA A DEVOLVER UNA PROMESA QUE ES UN ARRAY DE SIMPLEPOKEMONS
const getPokemons = async(limit: number = 20, offset: number = 0): Promise<SimplePokemon[]> => {
    const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then( res => res.json())


    //ESTE ERROR VA A SALIR EN EL CARTEL QUE GENERA NEXT, SI YO LO DEJO ASÍ, SIEMPRE VA A DAR EL ERROR, ESTO LO TENEMOS QUE AGARRAR EN EL CATCH CREO
    // throw new Error('Esto es un error que no debería de suceder');


    let pokemons = data.results.map(pokemon => (
      // el split va a sacar las barras del url y voy a tomar la posición -2 que es el numero del pokemon en la url
      {id: pokemon.url.split('/').at(-2)!,
      name: pokemon.name,
      url: pokemon.url
      }
    ))

    return pokemons
}

const PokemonsPage = async () => {

    let pokemons = await getPokemons(151)
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">Listado de Pokemons <small>estático</small></span>

      <PokemonGrid
        pokemons={pokemons}
      />
    </div>
  )
}

export default PokemonsPage
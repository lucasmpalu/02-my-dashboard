
import { Pokemon } from "Q/app/pokemons/interfaces/pokemon"
import { Metadata } from "next";
import Image from "next/image"
import { notFound } from "next/navigation"
import { useEffect } from "react";

interface Props {
    //SUPER IMPORTANTE
  params: {name: string}
}


export async function generateMetadata({ params }:Props): Promise<Metadata> {

  try {
    const { id, name } = await getPokemon(params.name);
  
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
const getPokemon = async (name: string): Promise<Pokemon> => {

  try {
    const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      // "cache: 'force-cache'" en una solicitud fetch indica al navegador que intente obtener la respuesta de la solicitud desde la caché del navegador, 
      // incluso si eso significa ignorar la política de almacenamiento en caché HTTP normal. 
      // Básicamente, fuerza al navegador a buscar en la caché del navegador primero antes de realizar una solicitud de red normal.
    // ,  cache: "force-cache", 
    next: {
      //esto sería revalidarlo cada 6 meses (60 segundos x 60 minutos x 30 dias x 6 meses)
      //si yo quiero revalidar el fetch, es para que se mantenga actualizada esa "precarga" del archivo estatico
      //
      // Para el contenido estático: revalidate se usa para especificar cada cuánto tiempo debe regenerarse la página estática en el servidor.
      //  Por ejemplo, si estableces revalidate: 60 * 60 * 24 (que es un día en segundos),
      //  la página estática se regenerará una vez al día en el servidor, lo que garantiza que siempre esté actualizada.
      //
      // Para el contenido dinámico: También se puede usar revalidate en páginas que generan contenido de forma dinámica en el servidor.
      //  En este caso, el tiempo especificado en revalidate controla cada cuánto tiempo debe volver a generarse la página dinámica en el servidor.
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
//cuando se construye la app, de manera estatica, ya va a construir estas paginas
export async function generateStaticParams() {

  interface FetchPoke {
    name: string
     url:string
  }

  let pokeFetch = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(res => res.json())

  let staticPokemons = pokeFetch.results.map((pokemon: FetchPoke) => {
    name: pokemon.name
  })


  //Tenemos que devolver un array con los mismos parametros del componente, el array por ej, que tenga la cantidad que queramos generar de manera estatica
  // Een este caso es [name] de la carpeta, el parametro
  // En la carpeta next -> server -> app --> hasta llegar acá. no habrá ninguna page creada dentro de [name], pero si creamos de manera estatica con la funcion,
  // ya estarán creadas y serán mandadas al cliente
  return staticPokemons.map((value:string) => {
    name: value
  })
}


//PARARMS ES UN OBJETO, DOS MANERAS DE TIPARLO
// const PokemonPage = ( params: {id: string} ) => {
const PokemonPage = async ( {params}: Props ) => {

  const pokemon = await getPokemon(params.name)


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
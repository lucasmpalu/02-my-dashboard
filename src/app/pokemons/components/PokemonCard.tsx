'use client'
import { useAppSelector } from "Q/store";
import { toggleFavorite } from "Q/store/pokemons/pokemonsSlice";
import Image from "next/image";
import Link from "next/link";
import { IoHeart, IoHeartCircle, IoHeartCircleOutline, IoHeartOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

interface Props {
    pokemonKey: number;
    src: string;
    name: string;
    width: number;
    height: number;
}

const PokemonCard = ({ pokemonKey, src, name, width, height }: Props) => {

    const id = pokemonKey
    const dispatch = useDispatch()

    //1- YO VOY A TENER UNA LISTA DE POKEMONS
    //2- SI UNA CARTA INDIVIDUAL, ENCUENTRA AL POKEMON 
    const isFavorite = useAppSelector(state => state.pokemons[id] !== undefined)

    return (
        <div className="mx-auto right-0 mt-2 w-60">
        <div className="bg-white rounded overflow-hidden shadow-lg">
            <div className="flex flex-col justify-center items-center text-center p-6 bg-gray-800 border-b">
                <Image
                    src={src}
                    alt={name}
                    width={100}
                    height={100}
                    //CON ESTO SE CARGA LA IMAGEN CUANDO SCROLLEO
                    //si está en true, se carga aunque no esté en la parte visible de la pantalla
                    priority={false}
                />
                <p className="pt-2 text-lg font-semibold text-gray-50">{name}</p>
                <div className="mt-5">
                    {/* el ? indica que después vienen los search params
                     el = da el valor a la key, lo que sigue al = será el valor y cuando está el & es porque lo que sigue es la key, un nuevo search param
                     LOS SEARCH PARAMS, LA INFO QUE VIENE POR URL, SIEMPRE SON STRINGS
                     */}
                    <Link href={`/dashboard/pokemons/${name}?id=${id}=&pic=${src}`}>
                        <button className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100">
                           Mas información
                        </button>
                    </Link>
                </div>
            </div>
            <div className="border-b">
                        <div  onClick={ () => { dispatch(toggleFavorite( { id: pokemonKey, name: name } ) ) } } className="items-center px-4 py-2 hover:bg-gray-100 cursor-pointer flex" >
                            
                                <div className="text-red-600" >
                                   { isFavorite 
                                        ? ( <IoHeart/> )
                                        : ( <IoHeartOutline/>)
                                    }
                                </div>
                                <div className="pl-3">
                                <p className="text-sm font-medium text-gray-800 leading-none">
                                    { isFavorite 
                                        ? 'Es favorito'
                                        : 'No es favorito'
                                    } 
                                </p>
                                <p className="text-xs text-gray-500">View your campaigns</p>
                                </div>
                           
                        </div>
                        
                    </div>
        </div>
    </div>
    );
}

export default PokemonCard;

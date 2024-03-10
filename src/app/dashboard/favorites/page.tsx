import FavoritesGrid from "Q/app/pokemons/components/FavoritesGrid"

export const metadata = {
title: 'Favoritos',
description: 'ad ninim sit cupidatat culpa censectetur'
}

const Page = async () => {

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">Pokemons Favoritos <small>Global State</small></span>

      <FavoritesGrid/>
    </div>
  )
}

export default Page
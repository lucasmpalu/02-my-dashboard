'use client';

import { Provider } from "react-redux";
import { store } from "./";


interface Props {
  children: React.ReactNode;
}

//EL PROVIDER LO HAGO ACÁ, PORQUE SI O SI TIENE QUE SER 'USE CLIENT', Y SI ES 'USE CLIENT' NO PUEDO PONERLE METADATA.

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={ store }>
      { children }
    </Provider>
  )
}
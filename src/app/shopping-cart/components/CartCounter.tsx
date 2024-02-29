'use client'

//si uso useState, tiene que ser generado del lado del servidor
import { useState } from "react";

interface Props {
  value?: number
}

export const CartCounter = ({value = 0}: Props) => {

  const [counter, setCounter] = useState(value);

  const increaseCounter = () => {
    setCounter(counter + 1)
  }

  const decrementCounter = () => {
    setCounter(counter - 1)
  }

  return (
    <>
      <span className='text-9xl'>{counter}</span>
        <div className='flex'>
          <button onClick={increaseCounter}className='flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-20 mr-2'>
            +1
          </button>
          <button onClick={decrementCounter} className='flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-20 mr-2'>
            -1
          </button>
        </div>
    </>
  )
}


// ☑️☑️☑️☑️ IMPORTANTE: EL LADO DEL CLIENTE SON HOOKS, LOCAL STORAGE Y TODO LO Q SE ALMACENE DEL LADO DEL CLIENTE
'use client'

import { useAppSelector } from "Q/store"
import { addOne, substractOne, initCounterState } from "Q/store/counter/counterSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

interface Props {
  value?: number
}


export interface CounterResponse {
  method: string
  count: number
}

const getApiCounter = async():Promise<CounterResponse> => {
  const data = await fetch('/api/counter')
  .then( res => res.json() );

  console.log(data)

  return data
}


export const CartCounter = ({value = 0}: Props) => {

  const dispatch = useDispatch()

  const count = useAppSelector(state => state.counter.count)

  // useEffect(() => {
  //   dispatch(initCounterState(value))
  // }, []);

  useEffect(() => {
    getApiCounter()
    .then( (res) => dispatch( initCounterState(res.count) ))
  }, []);

  return (
    <>
      <span className='text-9xl'>{count}</span>
        <div className='flex'>
          <button onClick={ () => {dispatch( addOne() ) } } className='flex bg-red-700 items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-20 mr-2'>
            +1
          </button>
          <button onClick={ () => {dispatch( substractOne() ) } } className='flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-20 mr-2'>
            -1
          </button>
        </div>
    </>
  )
}

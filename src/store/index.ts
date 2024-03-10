import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import pokemonsSlice from './pokemons/pokemonsSlice';

export const store = configureStore({
  reducer: {counter: counterReducer,
            pokemons: pokemonsSlice}
},)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Úselo en toda su aplicación en lugar de `useDispatch` y `useSelector` simples
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
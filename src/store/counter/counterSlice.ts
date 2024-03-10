
//rxslice ES EL 'rafce' PARA LOS SLICE, ME TRAE TODO
import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
    count: number
    isReady: boolean
}

const initialState: CounterState = {
    count: 5,
    isReady: false
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        initCounterState(state, action: PayloadAction<number>) {
            // Solo se va a ejecutar una vez, es decir,
            // si vuelvo a llamar al counter, el useEffect va a ejecutarse 
            // pero esta action va al return porque isReady ya es true
            if (state.isReady) return;
           
            state.count = action.payload; // Utiliza action.payload en lugar de action
            state.isReady = true; // Actualiza isReady a true después de la inicialización
        },
        addOne(state) {
            state.count++;
        },
        substractOne(state) {
            if (state.count === 0) return;
            state.count--;
        },
        resetCount(state, action: PayloadAction<number>) {
            if (action.payload < 0) action.payload = 0;
            state.count = action.payload;
        }
    }
})


export const { addOne, substractOne, resetCount, initCounterState } = counterSlice.actions

export default counterSlice.reducer


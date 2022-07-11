import { configureStore } from '@reduxjs/toolkit'
import SchulteSlice from './slices/SchulteSlice'
import SquareGuesserSlice from "./slices/SquareGuesserSlice";

const store = configureStore({
  reducer: {
    schulte: SchulteSlice,
    squareGuesser: SquareGuesserSlice,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import SchulteSlice from './slices/SchulteSlice'

const store = configureStore({
  reducer: {
    schulte: SchulteSlice,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

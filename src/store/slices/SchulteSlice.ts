import { createSlice } from '@reduxjs/toolkit'

export const schulteSlice = createSlice({
  name: 'schulte',
  initialState: {
    tableSize: 5,
    isGameStarted: false,
  },
  reducers: {
    setTableSize(state, action) {
      state.tableSize = action.payload
    },
    setIsGameStarted(state, action) {
      state.isGameStarted = action.payload
    }
  },
})

export const { setTableSize, setIsGameStarted } = schulteSlice.actions;

export default schulteSlice.reducer

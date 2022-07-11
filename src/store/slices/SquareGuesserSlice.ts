import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const squareGuesserSlice = createSlice({
   name: "squareGuesser",
   initialState: {
      isGameStarted: false,
   },
   reducers: {
      setIsGameStarted(state, action: PayloadAction<boolean>) {
         state.isGameStarted = action.payload;
      }
   },
});

export const { setIsGameStarted } = squareGuesserSlice.actions;

export default squareGuesserSlice.reducer;

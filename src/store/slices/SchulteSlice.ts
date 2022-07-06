import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const fontRatio = 0.4;

export const schulteSlice = createSlice({
   name: "schulte",
   initialState: {
      tableSize: 5,
      isGameStarted: false,
      cellStyleSize: 50,
      cellFontSize: 20,
      elapsedTime: 0,
   },
   reducers: {
      setTableSize(state, action: PayloadAction<number>) {
         state.tableSize = action.payload;
      },
      setIsGameStarted(state, action: PayloadAction<boolean>) {
         state.isGameStarted = action.payload;
      },
      setCellStyleSize(state, action: PayloadAction<number>) {
         state.cellStyleSize = action.payload;
      },
      setCellFontSize(state, action: PayloadAction<number>) {
         state.cellFontSize = Math.floor(action.payload * fontRatio);
      },
      setElapsedTime(state, action: PayloadAction<number>) {
         state.elapsedTime = action.payload;
      }
   },
});

export const {
   setTableSize,
   setIsGameStarted,
   setCellStyleSize,
   setCellFontSize,
   setElapsedTime,
} = schulteSlice.actions;

export default schulteSlice.reducer

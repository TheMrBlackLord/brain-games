import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const fontRatio = 0.4;

export const schulteSlice = createSlice({
   name: "schulte",
   initialState: {
      tableSize: 5,
      isGameStarted: false,
      cellStyleSize: 50,
      cellFontSize: 20,
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
   },
});

export const {
   setTableSize,
   setIsGameStarted,
   setCellStyleSize,
   setCellFontSize
} = schulteSlice.actions;

export default schulteSlice.reducer

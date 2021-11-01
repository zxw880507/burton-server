import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleMode(state) {
      state = !state;
      return state;
    },
  },
});

export default modeSlice.reducer;
export const { toggleMode } = modeSlice.actions;
export const modeState = (state) => state.modeState;

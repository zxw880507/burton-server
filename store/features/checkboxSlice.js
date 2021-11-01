import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productMapping } from "../../utils/helpers";

const initialState = {
  checkbox: {},
  status: "idle",
  error: null,
};

export const getCheckbox = createAsyncThunk(
  "getCheckbox",
  (_, { getState, dispatch, rejectWithValue }) => {
    const { product, status, error } = getState().productState;
    if (status === "succeeded") {
      const data = productMapping(product);
      return data;
    }
    if (status === "failed") {
      return rejectWithValue(error);
    }
  }
);

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    // setCheckbox(state, action) {
    //   const data = Object.keys(action.payload).reduce((a, b) => {
    //     a[b] = [];
    //     return a;
    //   }, {});
    //   state = data;
    //   return state;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getCheckbox.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCheckbox.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checkbox = action.payload;
      })
      .addCase(getCheckbox.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default checkboxSlice.reducer;
// export const { setCheckbox } = checkboxSlice.actions;
export const checkboxState = (state) => state.checkboxState;

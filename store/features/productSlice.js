import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductById = createAsyncThunk(
  "getProductById",
  async (pid, { getState, dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/${pid}`);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  product: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default productSlice.reducer;

export const productState = (state) => state.productState;

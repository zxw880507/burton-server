import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductFetchingList = createAsyncThunk(
  "getProductFetchingList",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/userId`);
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
  productFetchingList: [],
  status: "idle",
  error: null,
};

const productFetchingSlice = createSlice({
  name: "productFetching",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductFetchingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductFetchingList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productFetchingList = action.payload;
      })
      .addCase(getProductFetchingList.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default productFetchingSlice.reducer;

export const productFetchingState = (state) => state.productFetchingState;

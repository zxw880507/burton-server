import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sortDemand, restockQueryString } from "../../utils/helpers";
import axios from "axios";

const initialState = {
  restock: [],
  status: "idle",
  error: null,
};

export const fetchRestock = createAsyncThunk(
  "fetchRestock",
  async (pid, { getState, dispatch, rejectWithValue }) => {
    const { product } = getState().productState;
    const { form } = getState().formState;
    const sortedProduct = sortDemand(product, form);
    try {
      const data = await Promise.all(
        sortedProduct.map((item) =>
          axios
            .get(`api/restock/${pid}`, { params: { item } })
            .then((res) => res.data)
        )
      );

      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const restockSlice = createSlice({
  name: "restock",
  initialState,
  reducers: {
    restockReset(state) {
      state.restock = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRestock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restock = action.payload;
      })
      .addCase(fetchRestock.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default restockSlice.reducer;
export const { restockReset } = restockSlice.actions;
export const restockState = (state) => state.restockState;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  demand: [],
  status: "idle",
  error: null,
};

export const fetchOnDemand = createAsyncThunk(
  "fetchOnDemand",
  async (pid, { getState, dispatch, rejectWithValue }) => {
    const { form } = getState().formState;
    try {
      const res = await axios.post(`/api/demand/${pid}`, { form });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const demandSlice = createSlice({
  name: "demand",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOnDemand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOnDemand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.demand = action.payload;
      })
      .addCase(fetchOnDemand.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default demandSlice.reducer;
export const demandState = (state) => state.demandState;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: null,
  status: "idle",
  isSent: false,
  message: null,
};

export const sendEmail = createAsyncThunk(
  "sendEmail",
  async (_, { getState, rejectWithValue }) => {
    const { email } = getState().emailState;
    const { demand } = getState().demandState;

    try {
      const res = axios.post(`/api/email/${email}`, { demand });
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    getEmail(state, action) {
      state.email = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.status = "sending";
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.status = "sent";
        state.isSent = true;
        state.message = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.status = "unsent";
        state.isSent = false;
        state.message = action.payload.errorMessage;
      });
  },
});

export default emailSlice.reducer;
export const { getEmail } = emailSlice.actions;
export const emailState = (state) => state.emailState;

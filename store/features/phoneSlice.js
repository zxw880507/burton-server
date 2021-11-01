import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMsgArray } from "../../utils/helpers";
import axios from "axios";

const initialState = {
  phoneNumber: null,
  status: "idle",
  isSent: false,
  message: null,
};

export const sendSMSMessage = createAsyncThunk(
  "sendSMSMessage",
  async (_, { getState, rejectWithValue }) => {
    const { phoneNumber } = getState().phoneState;
    const { demand } = getState().demandState;
    const messages = getMsgArray(demand, 1500);
    try {
      const promiseArr = messages.map((msg) =>
        axios.post(`/api/sms/${phoneNumber}`, { msg })
      );
      const res = await Promise.all(promiseArr);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    getPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendSMSMessage.pending, (state) => {
        state.status = "sending";
      })
      .addCase(sendSMSMessage.fulfilled, (state, action) => {
        state.status = "sent";
        state.isSent = true;
        state.message = action.payload;
      })
      .addCase(sendSMSMessage.rejected, (state, action) => {
        state.status = "unsent";
        state.isSent = false;
        state.message = action.payload.errorMessage;
      });
  },
});

export default phoneSlice.reducer;
export const { getPhoneNumber } = phoneSlice.actions;
export const phoneState = (state) => state.phoneState;

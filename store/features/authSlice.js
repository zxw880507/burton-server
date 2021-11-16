import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  auth: {},
  status: "idle",
  error: null,
};

export const setSignup = createAsyncThunk(
  "setSignup",
  async (userInfo, { rejectWithValue }) => {
    try {
      const res = await axios.post("api/auth/signup", userInfo);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const setLogin = createAsyncThunk(
  "setLogin",
  async (userInfo, { rejectWithValue }) => {
    try {
      const res = await axios.post("api/auth/login", userInfo);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSession = createAsyncThunk(
  "getSession",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("api/auth/login");
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const setLogout = createAsyncThunk(
  "setLogout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post("api/auth/logout");
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setSignup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSignup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(setSignup.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(setLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(setLogin.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(getSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(getSession.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(setLogout.fulfilled, (state) => {
        state.status = "idle";
        state.auth = {};
        state.error = null;
      })
      .addCase(setLogout.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default authSlice.reducer;
export const { resetError } = authSlice.actions;
export const authState = (state) => state.authState;

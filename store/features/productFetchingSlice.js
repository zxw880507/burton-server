import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductFetchingList = createAsyncThunk(
  "getProductFetchingList",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const userId = getState().authState.auth.id;
    try {
      const res = await axios.get(`/api/productFetching/${userId}`);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProductFetch = createAsyncThunk(
  "addProductFetch",
  async (fetchForm, { getState, rejectWithValue }) => {
    const userId = getState().authState.auth.id;
    try {
      const res = await axios.post(`/api/productFetching/${userId}`, {
        fetchForm,
      });
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductFetch = createAsyncThunk(
  "updateProductFetch",
  async ({ fetchForm, id }, { getState, rejectWithValue }) => {
    const userId = getState().authState.auth.id;
    try {
      const res = await axios.put(`/api/productFetching/${userId}`, {
        fetchForm,
        id,
      });
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductFetch = createAsyncThunk(
  "deleteProductFetch",
  async (id, { getState, rejectWithValue }) => {
    const userId = getState().authState.auth.id;
    try {
      const res = await axios.delete(`/api/productFetching/${userId}`, {
        data: { id },
      });
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
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
      })
      .addCase(addProductFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productFetchingList.push(action.payload);
      })
      .addCase(addProductFetch.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(updateProductFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        const index = state.productFetchingList.findIndex((el) => el.id === id);
        if (index === -1) {
          return state;
        }
        state.productFetchingList.splice(index, 1, action.payload);
      })
      .addCase(updateProductFetch.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(deleteProductFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        const index = state.productFetchingList.findIndex((el) => el.id === id);
        if (index === -1) {
          return state;
        }
        state.productFetchingList.splice(index, 1);
      })
      .addCase(deleteProductFetch.rejected, (state, action) => {
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

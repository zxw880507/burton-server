import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  form: {},
  status: "idle",
  error: null,
};

export const setFormState = createAsyncThunk(
  "setFormState",
  (_, { getState }) => {
    const { checkbox } = getState().checkboxState;
    const data = Object.keys(checkbox).reduce((a, b) => {
      a[b] = [];
      return a;
    }, {});
    return data;
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    handleCheck(state, action) {
      const { label, value } = action.payload;

      const index = state.form[label].findIndex((el) => el === value);
      if (index === -1) {
        state.form[label].push(value);
      } else {
        state.form[label].splice(index, 1);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(setFormState.fulfilled, (state, action) => {
      state.status = "initialized";
      state.form = action.payload;
    });
  },
});

export default formSlice.reducer;
export const { handleCheck } = formSlice.actions;
export const formState = (state) => state.formState;

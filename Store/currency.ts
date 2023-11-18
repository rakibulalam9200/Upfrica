import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: { label: "USA", value: "$" },
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      console.log(action.payload, "action payload...");
      state.currency = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;

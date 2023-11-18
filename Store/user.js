import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
};

export const userSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    storeToken: (state, action) => {
      console.log(action.payload, "token...");
      state.token = action.payload;
    },
    storeUser: (state, action) => {
      console.log(action.payload, "token...");
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeToken, storeUser } = userSlice.actions;

export default userSlice.reducer;

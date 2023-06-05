import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "login",
  initialState: {
    loggedin: null,
  },
  reducers: {
    loginUsers: (state, action) => {
      state.loggedin = action.payload;
    },
  },
});

export const { loginUsers } = userSlice.actions;

export default userSlice.reducer;

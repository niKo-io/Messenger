import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../Slice/UserSlice";

const Store = configureStore({
  reducer: {
    login: authSlice,
  },
});

export default Store;

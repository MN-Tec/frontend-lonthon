import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./homepage-slice";

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
  },
});

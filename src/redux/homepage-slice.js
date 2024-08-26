import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homepageData: [],
  isLoading: true,
  contentByCat: [],
  token: "",
  userData: {},
  isLoggedIn: false,
  dashboardData: {},
  ads: {},
};

export const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setHomepageData: (state, action) => {
      state.homepageData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setContentByCat: (state, action) => {
      state.contentByCat = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    setAds: (state, action) => {
      state.ads = action.payload;
    },
  },
});

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;

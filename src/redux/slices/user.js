import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
  userList: null,
  showUserList: null,
  isApproveAccount: false,
  updateLoading: false,
  updateError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUpdateLoading: (state, { payload }) => {
      state.updateLoading = payload;
    },
    setUpdateError: (state, { payload }) => {
      state.updateError = payload;
      state.updateLoading = false;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userSignup: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    setUserList: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userList = payload;
    },
    setShowUserList: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.showUserList = payload;
    },
    setIsApproveAccount: (state, { payload }) => {
      state.isApproveAccount = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  userLogin,
  userLogout,
  userSignup,
  setUserList,
  setShowUserList,
  setIsApproveAccount,
  setUpdateError,
  setUpdateLoading,
} = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;

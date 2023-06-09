import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
  userList: null,
  showUserList: null,
  isApproveAccount: false,
  updateLoading: false,
  updateError: null,
  isUpdated: false,
  isChangedPassword: false,
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
      state.updateError = null;
    },
    setUpdateError: (state, { payload }) => {
      state.updateError = payload;
      state.updateLoading = false;
      state.isUpdated = false;
    },
    setIsUpdated: (state, { payload }) => {
      state.isUpdated = payload;
      state.updateError = null;
    },
    setIsChangedPassword: (state, { payload }) => {
      state.isChangedPassword = payload;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = { ...state.userInfo, ...payload };
      // console.log("🚀 ~ payload:", payload);
      const userToken = JSON.parse(localStorage.getItem("userInfo"));
      // console.log("🚀 ~ userToken:", userToken);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          accessToken: userToken.accessToken,
          user: payload.user,
        })
      );
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
  setIsUpdated,
  setUserInfo,
  setIsChangedPassword,
} = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;

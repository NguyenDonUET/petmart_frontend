import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  postList: null,
  showPostList: null,
  singlePost: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setPostList: (state, { payload }) => {
      state.postList = payload;
      state.error = null;
      state.loading = false;
    },
    setShowPostList: (state, { payload }) => {
      state.showPostList = payload;
      state.loading = false;
      state.error = null;
    },
    setSinglePost: (state, { payload }) => {
      state.singlePost = payload;
      state.error = null;
      state.loading = false;
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
  setPostList,
  setSinglePost,
  setShowPostList,
} = postSlice.actions;

export default postSlice.reducer;

export const userSelector = (state) => state.user;
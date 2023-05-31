import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  postList: null, // ở trang chủ
  showPostList: null, // ở trang chủ
  singlePost: null,
  creator: null,
  adminPostList: null, // ở trang ds của admin
  showAdminPostList: null, // ở trang ds của admin
  postsCount: 0, // tổng số bài đăng
  filterParams: "",
  isLike: false,
  createdPostList: null,
  favouritePostList: null,
  postForNotification: null,
  updateLoading: false,
  updateError: null,
  isReview: false,
  reviews: [],
  showReviewList: [],
  countRating: [],
};

export const postSlice = createSlice({
  name: "post",
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
    },
    setPostList: (state, { payload }) => {
      state.postList = payload;
      state.error = null;
      state.loading = false;
    },
    setPostsCount: (state, { payload }) => {
      state.postsCount = payload;
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
    setCreator: (state, { payload }) => {
      state.creator = payload;
      state.error = null;
      state.loading = false;
    },
    setFilterParams: (state, { payload }) => {
      state.filterParams = payload;
      state.error = null;
      state.loading = false;
    },
    setAdminPostList: (state, { payload }) => {
      state.adminPostList = payload;
      state.error = null;
      state.loading = false;
    },
    setShowAdminPostList: (state, { payload }) => {
      state.showAdminPostList = payload;
      state.error = null;
      state.loading = false;
    },
    setIsLike: (state, { payload }) => {
      state.isLike = payload;
      state.error = null;
      state.loading = false;
    },
    setIsReview: (state, { payload }) => {
      state.isReview = payload;
      state.error = null;
      state.loading = false;
    },
    setCountRating: (state, { payload }) => {
      state.countRating = payload;
    },
    setReviews: (state, { payload }) => {
      state.reviews = payload;
      state.error = null;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setCreatedPostList: (state, { payload }) => {
      state.createdPostList = payload;
      state.error = null;
      state.loading = false;
    },
    setFavouritePostList: (state, { payload }) => {
      state.favouritePostList = payload;
      state.error = null;
      state.loading = false;
    },
    setPostForNotification: (state, { payload }) => {
      state.postForNotification = payload;
      state.error = null;
      state.loading = false;
    },
    setShowReviewList: (state, { payload }) => {
      state.showReviewList = payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setPostList,
  setSinglePost,
  setShowPostList,
  setPostsCount,
  setFilterParams,
  setIsLike,
  setReviews,
  setIsReview,
  setAdminPostList,
  setShowAdminPostList,
  setCreator,
  setCreatedPostList,
  setFavouritePostList,
  setPostForNotification,
  setUpdateError,
  setUpdateLoading,
  setCountRating,
  setShowReviewList,
} = postSlice.actions;

export default postSlice.reducer;

export const userSelector = (state) => state.user;

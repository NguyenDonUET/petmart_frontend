import axios from "axios";
import {
  setAdminPostList,
  setCountRating,
  setCreatedPostList,
  setCreator,
  setError,
  setFavouritePostList,
  setIsLike,
  setIsReview,
  setLoading,
  setPostForNotification,
  setPostList,
  setPostsCount,
  setReviews,
  setShowAdminPostList,
  setShowPostList,
  setShowReviewList,
  setSinglePost,
  setUpdateError,
  setUpdateLoading,
} from "../slices/post";
import { checkPostId } from "../../utils/checkPostId";

export const getAllPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/posts`,
      config
    );
    const { posts, totalPosts } = data;
    // console.log(posts);
    dispatch(setShowAdminPostList(posts));
    dispatch(setAdminPostList(posts));

    console.log("lấy ds posts của admin");
  } catch (error) {
    console.log("Lỗi khi lấy bài đăng");
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const sortShowPostList = (sortBy) => async (dispatch, getState) => {
  const { post } = getState();
  const { postList, showPostList } = post;
  if (!postList && !showPostList) return;

  const { prop, value } = sortBy;
  // giảm dần b[prop] - a[prop]
  // tăng dần a[prop] - b[prop]
  let sortedPosts = [];
  if (prop !== "createdDate") {
    if (value === "desc") {
      sortedPosts = [...postList].sort((a, b) => b[prop] - a[prop]);
    } else {
      sortedPosts = [...postList].sort((a, b) => a[prop] - b[prop]);
    }
  } else {
    if (value === "desc") {
      sortedPosts = [...postList].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    } else {
      sortedPosts = [...postList].sort(
        (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
      );
    }
  }
  //   console.log(sortedPosts);
  dispatch(setShowPostList(sortedPosts));
};

export const filterPosts = (filterParams) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/posts/?${filterParams}`,
      config
    );
    const { postsCount, posts } = data;
    dispatch(setShowPostList(posts));
    dispatch(setPostList(posts));
    dispatch(setPostsCount(postsCount));
    console.log("lọc các posts");
  } catch (error) {
    console.log("Lỗi khi lọc posts");
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const getPosts =
  (currentPage = 1) =>
  async (dispatch, getState) => {
    const {
      post: { filterParams },
    } = getState();
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(filterParams);
      // console.log(currentPage);

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/posts/?${filterParams}&page=${currentPage}`,
        config
      );
      const { totalPosts, posts } = data;
      console.log(`/api/posts/?${filterParams}&page=${currentPage}`);
      // console.log(posts);
      // cập nhật tổng số bài đăng
      // console.log(data);
      dispatch(setPostsCount(totalPosts));
      dispatch(setShowPostList(posts));
      dispatch(setPostList(posts));
      // console.log("lấy posts");
    } catch (error) {
      console.log("Lỗi khi lọc posts");
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };

export const getPostById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/posts/${id}`,
      config
    );
    dispatch(setSinglePost(data));
    dispatch(setCreator(data.creator));
    console.log("lấy 1 bai dang");
  } catch (error) {
    console.log("Lỗi khi lấy 1 bài đăng");
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};
export const getPostForNotifi = (id) => async (dispatch) => {
  // dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/posts/${id}`,
      config
    );
    dispatch(setPostForNotification(data));
    console.log("lấy bai dang thong bao");
  } catch (error) {
    console.log("Lỗi khi lấy bai dang thong bao");
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const createPost = (newPost) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/posts/new`,
      newPost,
      config
    );
    console.log(data);
    console.log("Đăng bài");
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const getFavoriteList = (postId) => async (dispatch, getState) => {
  // dispatch(setLoading(true));

  const {
    user: { userInfo },
  } = getState();
  const userId = userInfo.user.id;

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users/${userId}/favorite`,
      config
    );
    const {
      user: { posts },
    } = data;
    // kiểm tra trong ds có postId ko
    const havePostID = checkPostId(posts, postId);
    dispatch(setIsLike(havePostID));
    console.log("lấy ds bài yêu thích");
  } catch (error) {
    console.log("Lỗi khi lấy 1 bài đăng");
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const updateFavorite = (postId) => async (dispatch, getState) => {
  const {
    user: { userInfo },
    post: { isLike },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const reqBody = { postId };
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/users/favorite`,
      reqBody,
      config
    );
    // console.log(data);
    console.log("cập nhật like");
    dispatch(setIsLike(!isLike));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const getReviews = () => async (dispatch, getState) => {
  const {
    post: { singlePost },
  } = getState();
  const postId = singlePost.post.id;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/posts/${postId}/review`,
      config
    );
    const { reviews } = data;
    const countRating = [0, 0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      countRating[review.rating]++;
    });
    countRating[0] = reviews.length;
    dispatch(setCountRating(countRating));
    dispatch(setReviews(reviews));

    dispatch(setShowReviewList(reviews));
  } catch (error) {
    console.log("Lỗi khi lấy danh sách đánh giá");
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const getFavouritePosts = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users/${id}/favorite`,
      config
    );
    dispatch(setFavouritePostList(data.user.posts));

    console.log("lấy bài viết đã thích");
  } catch (error) {
    console.log("Lỗi khi lấy bài viết yêu thích");
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// lấy bài viết đã đăng
export const getCreatedPosts = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users/${id}/posts`,
      config
    );
    const { posts } = data;

    dispatch(setCreatedPostList(data.user.posts));

    console.log("lấy bài viết đã tạo");
  } catch (error) {
    console.log("Lỗi khi lấy bài viết đã tạo");
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const reviewPost = (newRating) => async (dispatch, getState) => {
  // dispatch(setLoading(true));
  const {
    user: { userInfo },
    post: { singlePost },
  } = getState();
  const postID = singlePost.post.id;
  const newReview = {
    review: {
      creator: userInfo.user.id,
      rating: newRating.rating,
      message: newRating.message,
    },
  };
  // console.log(newReview);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const reqBody = newReview;
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/posts/${postID}/review`,
      reqBody,
      config
    );
    console.log(data);
    console.log("Gửi review");
    dispatch(setIsReview(true));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// Xác thực bài đăng
export const approveNewPost = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/posts/${id}/approve`,
      {},
      config
    );
    console.log("🚀 ~ xác thực bài đăng:", data);
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
    dispatch(setIsApproveAccount(false));
  }
};

// Sửa bài đăng
export const editPost = (postId, newPost) => async (dispatch, getState) => {
  dispatch(setUpdateLoading(true));
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/posts/${postId}/edit`,
      newPost,
      config
    );
    dispatch(setUpdateLoading(false));
    console.log("🚀 ~ sửa bài đăng:", data);
  } catch (error) {
    dispatch(setUpdateLoading(false));
    dispatch(
      setUpdateError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

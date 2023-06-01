import axios from "axios";
import {
  setError,
  setLoading,
  userLogin,
  userLogout,
  userSignup,
  setUserList,
  setShowUserList,
  setIsApproveAccount,
  setUpdateLoading,
  setUpdateError,
  setIsUpdated,
  setUserInfo,
  setIsChangedPassword,
} from "../slices/user";

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/login`,
      { email, password },
      config
    );

    dispatch(userLogin(data));
    console.log("đăng nhập");
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("Lỗi khi đăng nhập");
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

export const getUserAccountList = () => async (dispatch, getState) => {
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
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users`,
      config
    );
    const { users } = data;
    dispatch(setShowUserList(users));
    dispatch(setUserList(users));
    console.log("lấy ds user account", users);
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

export const approveUserAccount = (id) => async (dispatch, getState) => {
  dispatch(setIsApproveAccount(false));
  const {
    user: { userInfo },
  } = getState();
  try {
    console.log(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/users/${id}/approve`,
      {},
      config
    );
    dispatch(setIsApproveAccount(true));
    console.log("xác thực account");
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

export const signup = (newUser) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/register`,
      newUser,
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(userSignup(data));
    console.log("đăng ký");
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

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const getUserInfoById = (userId) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users/${userId}`,
      {},
      config
    );
    console.log("lấy info 1 user", data);
    dispatch(setUserInfo(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfo = (newInfo) => async (dispatch, getState) => {
  dispatch(setIsUpdated(false));
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
    const {
      user: { id },
    } = userInfo;
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/users/${id}`,
      newInfo,
      config
    );
    console.log("🚀 ~ update profile user:", data);
    dispatch(setUpdateLoading(false));
    dispatch(setIsUpdated(true));
  } catch (error) {
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

export const editPassword = (values) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();
  dispatch(setIsChangedPassword(false));
  dispatch(setIsUpdated(false));
  dispatch(setUpdateLoading(true));
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/users/${userInfo.user.id}/password`,
      values,
      config
    );
    console.log("🚀 ~ thay đổi mật khẩu:", data);
    dispatch(setIsChangedPassword(true));
    dispatch(setUpdateLoading(false));
    dispatch(setIsUpdated(true));
  } catch (error) {
    console.log(error);
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

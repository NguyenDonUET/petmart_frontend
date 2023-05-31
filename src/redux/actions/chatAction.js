import axios from "axios";

import {
  setChatList,
  setChatMessages,
  setError,
  setLoading,
} from "../slices/chat";

export const getChatUsers = (idChatUser) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState((state) => state.user);
  const id = userInfo.user.id;
  // console.log("idChatUser", idChatUser);
  const body = {
    idChatUser,
  };
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/chatUsers/${id}`,
      body
    );
    console.log("🚀 ~ danh sach user:", data);
    dispatch(setChatList(data));
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

export const getChatMessages = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState((state) => state.user);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      from: userInfo.user.id,
      to: id,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/chat/getmsg`,
      body,
      config
    );
    // console.log("🚀 ~ danh sach messages:", data);
    dispatch(setChatMessages(data));
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

export const sendMessages = (id, message) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState((state) => state.user);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      from: userInfo.user.id,
      to: id,
      message,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/chat/addmsg/`,
      body,
      config
    );
    // console.log("🚀 ~ send message:", data);
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

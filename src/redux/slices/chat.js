import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  chatList: null,
  chatMessages: null,
  isStartChat: false, // Khi vào trang Chat
  isOpenChat: false, // Hiện lời chào khi chưa chat với ai hết
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setIsStartChat: (state, { payload }) => {
      state.isStartChat = payload;
    },
    setIsOpenChat: (state, { payload }) => {
      state.isOpenChat = payload;
    },
    setChatList: (state, { payload }) => {
      state.chatList = payload;
      state.error = null;
      state.loading = false;
    },
    setChatMessages: (state, { payload }) => {
      state.chatMessages = payload;
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
  setChatList,
  setChatMessages,
  setIsStartChat,
  setIsOpenChat,
} = chatSlice.actions;

export default chatSlice.reducer;

export const chatSelector = (state) => state.chat;

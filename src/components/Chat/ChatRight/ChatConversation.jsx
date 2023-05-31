import { Grid, Heading } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessages from "./ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  getChatMessages,
  sendMessages,
} from "../../../redux/actions/chatAction";
import { setChatMessages } from "../../../redux/slices/chat";
const serverEndpoint = "http://localhost:5000";
const ChatConversation = () => {
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { isStartChat, isOpenChat } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.user);
  const { chatMessages } = useSelector((state) => state.chat);
  const socketRef = useRef(null);
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = io(serverEndpoint);
    // xử lý sự kiện khi kết nối tới server thành công
    socketRef.current.connect();

    socketRef.current.on("connect", () => {
      console.log("Kết nối tới server thành công!");
    });
    //  gửi event add user
    socketRef.current.emit("add-user", userInfo.user.id);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      // khi có mess của user khác đến
      socketRef.current.on("msg-recieve", (msg) => {
        console.log("🚀 ~ msg:", msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    // cập nhật messages ngay lập tức
    arrivalMessage &&
      dispatch(setChatMessages([...chatMessages, arrivalMessage]));
  }, [arrivalMessage]);

  const handleSendMess = (msg) => {
    socketRef.current.emit("send-msg", {
      to: userId,
      from: userInfo.user.id,
      msg,
    });

    // call api post message
    dispatch(sendMessages(userId, msg));
    // set lại state chatMessages
    dispatch(
      setChatMessages([...chatMessages, { fromSelf: true, message: msg }])
    );
  };

  return (
    <>
      {isOpenChat && (
        <Grid
          width={"75%"}
          height={"100%"}
          gridTemplateColumns={"1fr"}
          gridTemplateRows={"auto 1fr auto"}
        >
          <ChatHeader />
          <ChatMessages socketRef={socketRef} />
          <ChatMessageInput handleSendMess={handleSendMess} />
        </Grid>
      )}
    </>
  );
};

export default ChatConversation;

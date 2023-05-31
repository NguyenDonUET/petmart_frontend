import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ChatSingleUser from "./ChatSingleUser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsStartChat } from "../../../redux/slices/chat";
import { getChatMessages } from "../../../redux/actions/chatAction";

const styleScroll = {
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  "&::-webkit-scrollbar-button": {
    display: "none",
  },
};

const ChatUserList = () => {
  const { chatList } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.user);
  const [chatUsers, setChatUsers] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatList) {
      console.log("🚀 ~ chatList:", chatList);
      setChatUsers(chatList);
    }
  }, [chatList]);

  return (
    <Flex
      gap={4}
      flexDirection={"column"}
      //   overflowY={"scroll"}
      overflow={"auto"}
      flexGrow={1}
      sx={styleScroll}
    >
      {chatUsers &&
        chatUsers.map((user) => {
          return <ChatSingleUser key={user.id} user={user} />;
        })}
    </Flex>
  );
};

export default ChatUserList;

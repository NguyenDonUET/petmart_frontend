import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, useParams } from "react-router-dom";
import ChatUsers from "../components/Chat/ChatLeft/ChatUsers";
import { getChatMessages, getChatUsers } from "../redux/actions/chatAction";
import { setIsOpenChat, setIsStartChat } from "../redux/slices/chat";
function Chat() {
  const dispatch = useDispatch();
  const { isStartChat, isOpenChat } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.user);
  const params = useParams();

  useEffect(() => {
    dispatch(getChatUsers());
    if (params && params.userId) {
      dispatch(getChatUsers(params.userId));
      dispatch(setIsStartChat(true));
      dispatch(getChatMessages(params.userId));
    }
    return () => {
      dispatch(setIsStartChat(false));
      dispatch(setIsOpenChat(false));
    };
  }, []);

  useEffect(() => {
    console.log("isOpenChat", isOpenChat);
  }, [isOpenChat]);

  return (
    <Box height={"100vh"} borderTop={"2px solid #f5897e"}>
      <Flex height={"100%"}>
        <ChatUsers />
        {!isOpenChat && (
          <Heading width={"100%"} textAlign={"center"} mt={4}>
            Hãy bắt đầu cuộc trò chuyện
          </Heading>
        )}
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Chat;

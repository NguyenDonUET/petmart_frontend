import React from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const [userName, setUserName] = useState("");
  const { userId } = useParams();
  const { chatList } = useSelector((state) => state.chat);

  useEffect(() => {
    if (chatList) {
      console.log("🚀 ~ chatList:", chatList);
      // tìm id user trong chat list
      const selectedUser = chatList.find((user) => user.id === userId);

      if (selectedUser) {
        // console.log("🚀 ~ selectedUser:", selectedUser.username);
        setUserName(selectedUser.username);
      }
    }
  }, [chatList]);

  return (
    <Box
      position="sticky"
      top="0"
      bg="white"
      color="#000"
      zIndex="1"
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.2)"
    >
      <Flex align="center" px="4" py="2" maxW="1200px" mx="auto" gap={4}>
        <Avatar boxSize={10} />
        <Flex flexDirection={"column"}>
          <Text fontWeight={"600"} fontSize={"16px"}>
            {userName}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatHeader;

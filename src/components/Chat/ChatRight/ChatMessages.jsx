import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./ChatMessages.css";

const ChatMessages = ({ socketRef }) => {
  const dispatch = useDispatch();
  const { chatMessages } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.user);
  const scrollRef = useRef();

  // useEffect(() => {
  //   if (chatMessages) {
  //     console.log("🚀 ~ chatMessages:", chatMessages);
  //   }
  // }, [chatMessages]);

  // scroll đến laste message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <Box maxHeight={"100%"} overflow={"auto"} padding={8}>
      <Flex flexDirection={"column"} rowGap={2}>
        {chatMessages &&
          chatMessages.map((mess) => {
            return (
              <HStack
                key={uuidv4()}
                className={mess.fromSelf ? "sender" : "receiver"}
              >
                {!mess.fromSelf && <Avatar boxSize={9} />}
                <Text ref={scrollRef} maxWidth={"600px"}>
                  {mess.message}
                </Text>
              </HStack>
            );
          })}
      </Flex>
    </Box>
  );
};

export default ChatMessages;

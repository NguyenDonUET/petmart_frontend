import { Button, Icon, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChatText } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsOpenChat, setIsStartChat } from "../../redux/slices/chat";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openChat = () => {
    dispatch(setIsStartChat(true));
    dispatch(setIsOpenChat(false));
    navigate("/chat");
    setIsOpen(!isOpen);
  };
  return (
    <Tooltip label="Trò chuyện" bg="pink.400">
      <Button
        colorScheme="gray"
        borderRadius={"50%"}
        onClick={() => openChat()}
      >
        <Icon as={BsChatText} boxSize={5} />
      </Button>
    </Tooltip>
  );
};

export default ChatButton;

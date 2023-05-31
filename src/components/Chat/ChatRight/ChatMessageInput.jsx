import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
// import { MdSend } from "react-icons/md";

function ChatMessageInput({ handleSendMess }) {
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(true);

  const handleSendMessage = () => {
    handleSendMess(message);
    setMessage("");
    setDisable(true);
  };
  const handleChange = (event) => {
    // if (event.target.value.trim().length >= 0) {
    //   // console.log("empty");
    //   console.log(event.target.value);
    // }
    if (event.target.value === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <InputGroup
      position="sticky"
      bottom="0"
      bg="white"
      zIndex="1"
      boxShadow="0 -2px 4px rgba(0, 0, 0, 0.2)"
      px="8"
      py="4"
    >
      <Flex align={"center"} width={"100%"} gap={4}>
        <Input
          placeholder="Nhập tin nhắn"
          value={message}
          onChange={(event) => handleChange(event)}
          onKeyDown={handleKeyDown}
        />
        {/* <InputRightElement>
          <IconButton
            aria-label="Send message"
            icon={<FaRegPaperPlane />}
            onClick={handleSendMessage}
          />
        </InputRightElement> */}
        <Button
          isDisabled={disable}
          leftIcon={<Icon as={FaRegPaperPlane} />}
          colorScheme="teal"
          variant="solid"
          onClick={handleSendMessage}
        ></Button>
      </Flex>
    </InputGroup>
  );
}

export default ChatMessageInput;

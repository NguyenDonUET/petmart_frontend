import {
  Box,
  Button,
  Icon,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillBell, AiOutlineBell } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../../redux/actions/notificationActions";
import NotificationList from "./NotificationList";

export default function NotificationButton() {
  const [notificationsCount, setNotificationsCount] = useState(0);
  const dispatch = useDispatch();
  const { numOfNewNotifications, error } = useSelector(
    (state) => state.notification
  );
  const { userInfo } = useSelector((state) => state.user);

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    isOpen ? onClose() : onOpen();
  };

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    dispatch(getNotifications());
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: "error",
        position: "top",
        isClosable: true,
      });
      navigate("/login");
    }
  }, [error]);

  useEffect(() => {
    setNotificationsCount(numOfNewNotifications);
  }, [numOfNewNotifications]);

  return (
    <Box position="relative">
      <Tooltip label="Thông báo">
        <Button
          className="notifi-button"
          colorScheme="gray"
          borderRadius={"50%"}
          onClick={() => handleClick()}
        >
          <Icon
            className="notifi-icon"
            as={isOpen ? AiFillBell : AiOutlineBell}
            boxSize={5}
          />
          {notificationsCount > 0 && (
            <Box
              position="absolute"
              top="-4px"
              right="-4px"
              bg="red.500"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              lineHeight="1"
              borderRadius="full"
              px={2}
              py={1}
            >
              {notificationsCount}
            </Box>
          )}
        </Button>
      </Tooltip>
      {isOpen && (
        <Box
          className="notification"
          position="absolute"
          top="100%"
          right="0"
          zIndex="2"
          bg="white"
          boxShadow="xl"
          p={3}
          rounded="md"
          minW="sm"
          maxH="md"
          overflowY="auto"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Stack spacing={3}>
            <Text fontSize="lg" fontWeight="bold" textAlign={"center"}>
              Thông báo
            </Text>
            <NotificationList closeList={onClose} />
            <Button size="sm" variant="link" onClick={onClose}>
              Đóng
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

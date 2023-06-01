import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { formatDate } from "../../utils/formatDate";
import { useDispatch } from "react-redux";
import { extendPost } from "../../redux/actions/postActions";
import { useEffect, useState } from "react";

const NotificationModal = ({ singlePost, isOpen, onClose, extendDate }) => {
  const oldDate = formatDate(singlePost.post.endDate);
  const newDate = formatDate(extendDate);
  let isEqual = oldDate === newDate;
  const dispatch = useDispatch();
  const toast = useToast();

  const handleApprovePost = () => {
    if (oldDate === newDate) {
      return;
    }
    toast({
      description: "Đã đồng ý gia hạn",
      status: "success",
      isClosable: true,
      position: "top",
    });
    dispatch(
      extendPost({
        extendDate,
        pid: singlePost.post.id,
      })
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight={"bold"}>GIA HẠN BÀI ĐĂNG</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack rowGap={4}>
            {singlePost && (
              <>
                <Text>Tên bài: {singlePost.post.title}</Text>
                <Text>Tác giả: {singlePost.creator.username}</Text>
                {!isEqual && (
                  <>
                    <Text>Ngày hết hạn cũ: {oldDate}</Text>
                    <Text>Ngày hết hạn mới: {newDate} </Text>
                  </>
                )}
              </>
            )}
            <Button
              color={"#fff"}
              bgColor={"teal.600"}
              _hover={{
                bgColor: "teal.500",
              }}
              leftIcon={<Icon as={BsCheckCircle} boxSize={4} />}
              onClick={() => handleApprovePost()}
            >
              {isEqual ? "Đã duyệt" : "Duyệt"}
            </Button>
          </Stack>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;

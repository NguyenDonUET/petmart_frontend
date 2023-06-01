import React from "react";
import RatingSelect from "../Rating/RatingSelect";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, reviewPost } from "../../redux/actions/postActions";

const ReviewForm = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const post = useSelector((state) => state.post);
  const { error, singlePost } = post;
  const dispatch = useDispatch();
  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setMessage(inputValue);
  };

  const submitReview = () => {
    const newReview = { rating, message };
    // validate trống
    if (rating <= 0 || message == "") {
      toast({
        description: "Vui lòng nhập đầy đủ thông tin đánh giá!",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }
    // console.log(newReview);
    // gọi api đánh giá và chuyển isReview = false
    dispatch(reviewPost(newReview));
    if (!error) {
      toast({
        description: "Gửi đánh giá thành công",
        status: "success",
        isClosable: true,
        position: "top",
      });
      dispatch(getPostById(singlePost.post.id));
    }
    // reset form
    setRating(0);
    setMessage("");

    // đóng form
    onClose();
  };

  return (
    <>
      <Modal
        size={{ base: "sm", md: "xl" }}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đánh giá bài viết</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <RatingSelect defaultRating={rating} updateRating={setRating} />
            </Flex>
            <Textarea
              mt={4}
              value={message}
              onChange={handleInputChange}
              placeholder="Nhập bình luận của bạn"
              size="sm"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => submitReview()}>
              Lưu
            </Button>
            <Button onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewForm;

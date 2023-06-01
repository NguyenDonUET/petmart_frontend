import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Link,
  Spacer,
  Text,
  useToast,
  Tooltip,
  IconButton,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import { AiOutlineEye } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate, useParams } from "react-router-dom";
import PostImages from "../components/PostDetail/PostImages.jsx";
import LikeButton from "../components/Posts/LikeButton.jsx";
import RatingSystem from "../components/Rating/RatingSystem.jsx";
import PostInformation from "../layouts/ProductReviews/PostInformation.jsx";
import PostReviews from "../layouts/ProductReviews/PostReviews.jsx";
import { extendPost, getPostById } from "../redux/actions/postActions.js";
import numberWithCommas from "../utils/numberWithCommas.js";
import LoadingList from "../components/Admin/LoadingList.jsx";
import { EditIcon, CalendarIcon } from "@chakra-ui/icons";
import ReviewPost from "../components/ReviewPost/ReviewPost.jsx";
import moment from "moment";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PostDetail = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [creator, setCreator] = useState(null);
  const [extendDate, setExtendDate] = useState(null);
  const [extending, setExtending] = useState(true);
  const [isSubmitExtend, setIsSubmitExtend] = useState(false);
  const { id } = useParams();
  const toast = useToast();

  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { loading, error, singlePost, reviews, countRating } = post;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let today = new Date();

  useEffect(() => {
    dispatch(getPostById(id));
  }, []);

  useEffect(() => {
    if (singlePost) {
      let dateObject = null;
      if (extendDate == undefined) {
        dateObject = new Date(singlePost.post.endDate);
        setExtendDate(dateObject);
      }
      setExtending(singlePost.post.extending);
      setPostInfo(singlePost.post);
      setCreator(singlePost.creator);
    }
    console.log("🚀 ~ singlePost:", singlePost);
  }, [singlePost]);

  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  }, [error]);

  useEffect(() => {
    console.log("🚀 ~ isSubmitExtend:", isSubmitExtend);
    if (isSubmitExtend) {
      toast({
        description: "Đã gửi yêu cầu gia hạn cho admin",
        status: "success",
        isClosable: true,
        position: "top",
      });
      onClose();
      setExtending(true);
      // dispatch(getPostById(id));
      setIsSubmitExtend(false);
    }
  }, [isSubmitExtend]);

  const handleExtendPost = (values) => {
    dispatch(extendPost(values));
    setIsSubmitExtend(true);
  };

  const handleExtendDateChange = (date) => {
    setExtendDate(date);
  };

  const handleExtendDateSelect = (date) => {
    setExtendDate(date);
  };

  return (
    <>
      {loading && <LoadingList />}
      {error && <Heading textAlign={"center"}>{error}</Heading>}
      {!loading && postInfo && (
        <Box width={"80%"} mx={"auto"} padding={8} my={"32px"}>
          <Flex gap={8}>
            <PostImages images={postInfo.images} />
            <Box width={"48%"}>
              <Flex justifyContent={"space-between"}>
                <Heading fontSize={"32px"} color={"#453227"}>
                  {postInfo.title}
                </Heading>
                {/* Nếu user hiện tại là tác giả bài viết */}
                {userInfo &&
                  (userInfo.user.role === "admin" ||
                    userInfo.user.id === creator.id) && (
                    <Flex>
                      {!extending && (
                        <Tooltip label={"Gia hạn bài viết"} placement="top">
                          <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Gia hạn bài đăng"
                            icon={<CalendarIcon />}
                            onClick={onOpen}
                          />
                        </Tooltip>
                      )}
                      <Tooltip label={"Chỉnh sửa bài đăng"} placement="top">
                        <Button
                          ml={"10px"}
                          leftIcon={<EditIcon />}
                          colorScheme="teal"
                          variant={"outline"}
                          onClick={() =>
                            navigate(`/posts/update/${postInfo.id}`)
                          }
                        >
                          Chỉnh sửa
                        </Button>
                      </Tooltip>
                    </Flex>
                  )}
              </Flex>

              {userInfo && userInfo.user.id === creator.id && (
                <Flex pt={2} justifyContent={"end"} alignItems={"center"}>
                  <Text
                    as={"b"}
                    color={"#4a5568"}
                  >{`Bài viết sẽ hết hạn sau ${moment(
                    singlePost.post.endDate
                  ).diff(today, "days")} ngày`}</Text>
                </Flex>
              )}
              <Flex padding={"12px"} alignItems={"center"}>
                <Flex height={"32px"} gap="10px" alignItems={"center"}>
                  <Flex>
                    <Text mr={"4px"} color={"pink.500"}>
                      {postInfo.star && postInfo.star.toFixed(2).toString()}
                    </Text>
                    <RatingSystem rating={postInfo.star} />
                  </Flex>
                  <Divider
                    orientation="vertical"
                    height={"20px"}
                    width={"1px"}
                    bgColor={"gray.500"}
                  />
                  <Text>{`${reviews.length} đánh giá`}</Text>
                </Flex>
                <Spacer />
                {/* Yêu thích bài đăng */}
                {userInfo && <LikeButton postId={postInfo.id} />}
              </Flex>
              <Heading color={"#ee4d2d"}>
                {numberWithCommas(postInfo.price)}đ
              </Heading>
              <Flex my={6}>
                <Button
                  bgColor={"green"}
                  color={"white"}
                  _hover={{ backgroundColor: "green.400" }}
                  onClick={() => {
                    navigate(`/chat/${creator.id}`);
                  }}
                >
                  Liên hệ với người bán
                </Button>
                <Spacer />
                <Text fontSize={"16px"}>
                  Tác giả:
                  <Link
                    color={"green.400"}
                    as={ReactLink}
                    to={`/author/${creator.id}`}
                    ml={"6px"}
                  >
                    {creator.username}
                  </Link>
                </Text>
              </Flex>

              <Flex justifyContent={"space-between"} color={"gray.600"}>
                <Text as={"span"}>Loại thú cưng : {postInfo.species}</Text>
                <Text as={"span"}>Số lượng : {postInfo.quantity} </Text>
              </Flex>
              <HStack mt={4} color={"gray.600"} fontSize={"15px"}>
                <Icon as={AiOutlineEye} />
                <Text> {postInfo.views} lượt xem</Text>
              </HStack>
            </Box>
          </Flex>
          <PostInformation postInfo={postInfo} />
          <PostReviews />
          {/* Modal GIA HẠN BÀI VIẾT */}
          <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text
                  display={"flex"}
                  justifyContent={"center"}
                  color={"#f5897e"}
                  py={"4"}
                >
                  GIA HẠN BÀI VIẾT
                </Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Formik
                  initialValues={{
                    extendDate: "",
                    pid: singlePost.post.id,
                  }}
                  onSubmit={(values) => {
                    handleExtendPost(values);
                  }}
                  validationSchema={Yup.object().shape({
                    extendDate: Yup.string().required(
                      "Vui lòng chọn ngày gia hạn kế tiếp"
                    ),
                  })}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                  }) => (
                    <Form id="extendDate">
                      <Field name="extendDate">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              form.errors.extendDate && form.touched.extendDate
                            }
                            mb={"4"}
                          >
                            <FormLabel>Ngày gia hạn mới</FormLabel>
                            <DatePicker
                              className=""
                              selected={extendDate}
                              onChange={(date) => {
                                handleExtendDateChange(date);
                                form.setValues({
                                  ...form.values,
                                  extendDate: date,
                                });
                              }}
                              onSelect={(date) => {
                                handleExtendDateSelect(date);
                                form.setValues({
                                  ...form.values,
                                  extendDate: date,
                                });
                              }}
                              minDate={moment().toDate()}
                              dateFormat="dd/MM/yyyy"
                            />
                            <FormHelperText>
                              Sau thời gian trên bài đăng sẽ hết hạn
                            </FormHelperText>
                            <FormErrorMessage>
                              {form.errors.extendDate}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Form>
                  )}
                </Formik>
              </ModalBody>

              <ModalFooter display={"flex"} justifyContent={"center"}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  bg="#f5897e"
                  _hover={{ bg: "#f56051" }}
                  form="extendDate"
                >
                  Xác nhận
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Hủy bỏ
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
};

export default PostDetail;

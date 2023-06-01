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
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as ReactLink } from "react-router-dom";
import PostInformation from "../../layouts/ProductReviews/PostInformation";
import { approveNewPost, getPostById } from "../../redux/actions/postActions";
import numberWithCommas from "../../utils/numberWithCommas";
import LoadingList from "./LoadingList";
import PostImages from "../PostDetail/PostImages";
import RatingSystem from "../Rating/RatingSystem";
import { setError, setIsApprovedPost } from "../../redux/slices/post";

const AdminPostDetail = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const {
    singlePost,
    creator,
    error,
    loading,
    loadingApprovePost,
    isApprovedPost,
  } = useSelector((state) => state.post);
  const params = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    if (params) {
      dispatch(getPostById(params.id));
    }
  }, []);

  // Hiện thông báo khi success hoặc gặp lỗi
  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: "error",
        isClosable: true,
        position: "top",
      });
      dispatch(setError(null));
      setIsApproved(false);
    }

    if (isApprovedPost) {
      toast({
        description: "Duyệt bài thành công",
        status: "success",
        isClosable: true,
        position: "top",
      });
      dispatch(setIsApprovedPost(false));
    }
  }, [error, isApprovedPost]);

  useEffect(() => {
    if (singlePost) {
      // console.log("🚀 ~ singlePost:", singlePost);
      setIsApproved(singlePost.post.isApproved);
      setPostInfo(singlePost.post);
    }
  }, [singlePost]);

  // Xư lý khi duyệt bài
  const handleClick = () => {
    setIsApproved(true);
    dispatch(approveNewPost(params.id));
  };

  return (
    <>
      {loading && <LoadingList />}
      {!loading && postInfo && (
        <Box width={"80%"} mx={"auto"} padding={8} my={"32px"}>
          <Flex gap={8}>
            <PostImages images={postInfo.images} />
            <Box width={"48%"}>
              <Flex justifyContent={"space-between"}>
                <Heading fontSize={"32px"} color={"#453227"}>
                  {postInfo.title}
                </Heading>
                <Button
                  isDisabled={isApproved}
                  backgroundColor={"blue.500"}
                  color={"#fff"}
                  _hover={{
                    backgroundColor: "blue.200",
                  }}
                  isLoading={loadingApprovePost}
                  onClick={() => handleClick()}
                >
                  {isApproved ? "Đã duyệt bài" : "Duyệt bài"}
                </Button>
              </Flex>
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

                  <Text>0 comment</Text>
                  <Divider
                    orientation="vertical"
                    height={"20px"}
                    width={"1px"}
                    bgColor={"gray.500"}
                  />
                </Flex>
                <Spacer />
              </Flex>
              <Heading color={"#ee4d2d"}>
                {numberWithCommas(postInfo.price)}đ
              </Heading>
              <Flex my={6}>
                <Button
                  bgColor={"green"}
                  color={"white"}
                  _hover={{ backgroundColor: "green.400" }}
                >
                  Chat với người bán
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
        </Box>
      )}
    </>
  );
};

export default AdminPostDetail;

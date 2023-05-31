import { Box } from "@chakra-ui/react";
import React from "react";
import SubTitle from "../../components/PostDetail/SubTitle";
import PostRatingOverview from "./PostRatingOverview";
// import PostRatingList from "./PostRatingList";
import ReviewPost from "../../components/ReviewPost/ReviewPost";
import { useSelector } from "react-redux";
import { lazy } from "react";
import LazyLoadingContainer from "../../components/LazyLoadingContainer";
const LazyPostRatingList = lazy(() => import("./PostRatingList"));

const PostReviews = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box>
      <SubTitle>Đánh giá sản phẩm</SubTitle>
      <PostRatingOverview />
      <Box textAlign={"end"}>{user.userInfo && <ReviewPost />}</Box>
      <LazyLoadingContainer>
        <LazyPostRatingList />
      </LazyLoadingContainer>
    </Box>
  );
};

export default PostReviews;

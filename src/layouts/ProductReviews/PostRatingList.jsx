import { Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PostComment from "../../components/PostDetail/PostComment";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../redux/actions/postActions";
import { setShowReviewList } from "../../redux/slices/post";

const PostRatingList = () => {
  const [isHiddens, setIsHiddens] = useState([]);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const { loading, isReview, showReviewList } = post;

  useEffect(() => {
    dispatch(getReviews());
  }, [isReview]);

  useEffect(() => {
    if (showReviewList.length > 0) {
      const arr = showReviewList.map((review) => review.isBad);
      setIsHiddens(arr);
    }
  }, [showReviewList]);

  const toggleView = (id, index) => {
    const newArr = [...isHiddens].map((value, idx) => {
      if (idx == index) {
        return !value;
      } else {
        return value;
      }
    });
    setIsHiddens(newArr);
  };
  return (
    <Stack mt={5} minHeight={"400px"}>
      {loading && <Heading>Loading...</Heading>}
      {showReviewList &&
        showReviewList.map((review, index) => {
          return (
            <PostComment
              key={review.id}
              review={review}
              toggleView={toggleView}
              isShow={isHiddens[index]}
              index={index}
            ></PostComment>
          );
        })}
      {showReviewList && showReviewList.length <= 0 && (
        <Heading textAlign={"center"} fontSize={{base: "md", sm: "lg"}}>
          Chưa có đánh giá nào.
        </Heading>
      )}
    </Stack>
  );
};

export default PostRatingList;

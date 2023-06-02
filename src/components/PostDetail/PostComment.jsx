import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import RatingSystem from "../Rating/RatingSystem";
import { formatDate } from "../../utils/formatDate";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const PostComment = ({ review, toggleView, index, isShow }) => {
  return (
    <>
      {review ? (
        <Box>
          <Flex paddingBottom={3}>
            <Avatar boxSize={9} name={review.creator.username} />
            <Box ml={4}>
              <Flex gap={3}>
                <Text>{review.creator.username}</Text>
                {review.isBad && (
                  <Flex align={"center"} gap={3} color={"gray.400"}>
                    <Text fontStyle={"italic"}>
                      Đánh giá này có thể vi phạm tiêu chuẩn cộng đồng. Cân nhắc
                      trước khi xem!
                    </Text>
                    {isShow ? (
                      <ViewOffIcon
                        cursor={"pointer"}
                        onClick={() => toggleView(review.id, index)}
                      />
                    ) : (
                      <ViewIcon
                        cursor={"pointer"}
                        onClick={() => toggleView(review.id, index)}
                      />
                    )}
                  </Flex>
                )}
              </Flex>
              <RatingSystem rating={review.rating} />
              <Text as="span" fontSize={"14px"} color={"gray.500"} mb={"10px"}>
                {formatDate(review.createdAt)}
              </Text>
              {!isShow && <Text mt={2}>{review.message}</Text>}
            </Box>
          </Flex>
          <Divider />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostComment;

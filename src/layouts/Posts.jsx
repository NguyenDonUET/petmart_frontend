import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import FilterPosts from "../components/Posts/FilterPosts";
import PostList from "../components/Posts/PostList";

const Posts = () => {
  return (
    <Box py={"26px"} px={"12"}>
      <Heading
        as={"h3"}
        textAlign={"center"}
        color={"#453227"}
        mb={"34px"}
        fontStyle={"italic"}
      >
        Danh sách bài đăng
      </Heading>

      <Flex
        flexDirection={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        gap={{ base: "0", md: "6px" }}
      >
        <FilterPosts />
        <PostList />
      </Flex>
    </Box>
  );
};

export default Posts;

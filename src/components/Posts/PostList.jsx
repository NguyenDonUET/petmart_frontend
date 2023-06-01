import { Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postActions";
import Pagination from "./Pagination";
import SinglePost from "./SinglePost";
import SortPosts from "./SortPosts";

const PostList = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { loading, error, showPostList, postsCount } = post;

  // update
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Grid gridTemplateRows={"auto 1fr auto"} flexBasis={"80%"}>
      <SortPosts></SortPosts>

      {loading && (
        <Heading fontSize={"14px"} textAlign={"center"} width={"100%"}>
          Đang tải bài viết...
        </Heading>
      )}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={1}
      >
        {error && <Heading>{error}</Heading>}
        {showPostList &&
          showPostList.length > 0 &&
          showPostList.map((post) => {
            return (
              <GridItem key={post.id}>
                <SinglePost post={post} />
              </GridItem>
            );
          })}
      </Grid>
      <Pagination itemsPerPage={8} />
    </Grid>
  );
};

export default PostList;

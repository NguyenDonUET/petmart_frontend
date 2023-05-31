import { lazy } from "react";
import Hero from "../layouts/Hero";
import { Box } from "@chakra-ui/react";
// import Posts from "../layouts/Posts";
import LazyLoadingContainer from "../components/LazyLoadingContainer";
const LazyPosts = lazy(() => import("../layouts/Posts"));

const HomePage = () => {
  return (
    <Box as="main">
      <Hero />
      {/* <Posts /> */}
      <LazyLoadingContainer>
        <LazyPosts />
      </LazyLoadingContainer>
    </Box>
  );
};

export default HomePage;

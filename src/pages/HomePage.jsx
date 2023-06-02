import { lazy, useEffect } from "react";
import Hero from "../layouts/Hero";
import { Box, useToast } from "@chakra-ui/react";
import Posts from "../layouts/Posts";
import LazyLoadingContainer from "../components/LazyLoadingContainer";
import { useSelector } from "react-redux";
import { isTokenExpired } from "../redux/auth/auth";
import { useNavigate } from "react-router-dom";
const LazyPosts = lazy(() => import("../layouts/Posts"));

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo && isTokenExpired(userInfo.accessToken)) {
      toast({
        description: "Phiên làm việc đã hêt hạn vui lòng đăng nhập lại",
        status: "error",
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    }
  }, []);

  return (
    <Box as="main">
      <Hero />
      <Posts />
      {/* <LazyLoadingContainer>
        <LazyPosts />
      </LazyLoadingContainer> */}
    </Box>
  );
};

export default HomePage;

import React from "react";
import Hero from "../layouts/Hero";
import { Box } from "@chakra-ui/react";
import Products from "../layouts/Products";

const HomePage = () => {
   return (
      <Box as="main" height={"calc(100vh - 84px)"}>
         <Hero />
         <Products />
      </Box>
   );
};

export default HomePage;

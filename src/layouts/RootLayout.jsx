import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box, Flex, Grid } from "@chakra-ui/react";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const { isStartChat } = useSelector((state) => state.chat);
  useEffect(() => {
    console.log("🚀 ~ isStartChat:", isStartChat);
  }, [isStartChat]);
  return (
    <Grid minHeight={"100vh"} templateRows={"auto 1fr auto"}>
      <Header />
      <Outlet />
      {!isStartChat && <Footer />}
    </Grid>
  );
};

export default RootLayout;

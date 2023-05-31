import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box
      height="85vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="4xl" mb="2">
        404 - Page Not Found
      </Text>
      <Text fontSize="2xl" mb="2">
        The page you are looking for does not exist.
      </Text>
    </Box>
  );
};

export default NotFound;

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const UserAccount = ({ name, email }) => {
  return (
    <Flex gap={2}>
      <Avatar name={name} />
      <Box>
        <Text fontWeight={"bold"}>{name}</Text>
        <Text color={"gray.500"}>{email}</Text>
      </Box>
    </Flex>
  );
};

export default UserAccount;

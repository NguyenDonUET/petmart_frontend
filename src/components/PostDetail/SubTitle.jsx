import { Heading } from "@chakra-ui/react";
import React from "react";

const SubTitle = ({ children }) => {
  return (
    <Heading
      bgColor={"gray.50"}
      padding={3}
      fontSize={{ base: "20px", sm: "24px" }}
      as={"h3"}
      my={6}
      color={"rgba(0,0,0,.80)"}
      fontWeight={"600"}
    >
      {children.toUpperCase()}
    </Heading>
  );
};

export default SubTitle;

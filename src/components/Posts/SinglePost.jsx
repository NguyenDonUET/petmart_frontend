import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import RatingSystem from "../Rating/RatingSystem";
import { Link as ReactLink } from "react-router-dom";
import numberWithCommas from "../../utils/numberWithCommas";
import { ViewIcon } from "@chakra-ui/icons";

function SinglePost({ post }) {
  const { creator } = post;
  const { id, image, species, gender, province, title, star, price, views } =
    post;
  const author = creator.username;

  return (
    <Card maxW="xs">
      <CardBody>
        <Link as={ReactLink} to={`/posts/${id}`}>
          <Image
            height={"200px"}
            width={"100%"}
            objectFit={"cover"}
            src={image}
            alt="image"
            rounded={"md"}
          ></Image>
        </Link>
        <Flex
          fontSize={{ base: "12px", md: "12px", lg: "14px", xl: "16px" }}
          justifyContent={"space-between"}
          mt={"4px"}
          color={"gray.500"}
        >
          <Text>{species}</Text>
          <HStack>
            <Icon as={CiLocationOn}></Icon>
            <Text ml={0}>{province}</Text>
          </HStack>
        </Flex>
        <Heading
          as={"h6"}
          fontSize={"17px"}
          mt={"16px"}
          cursor={"pointer"}
          transition={"color .3s"}
          _hover={{
            color: "green.500",
          }}
        >
          <Link
            as={ReactLink}
            to={`/posts/${id}`}
            fontSize={{
              base: "14px",
              md: "16px",
              lg: "18px",
            }}
          >
            {title}
          </Link>
        </Heading>
        <HStack
          color={"gray.500"}
          fontSize={{ base: "12px", md: "12px", lg: "14px", xl: "16px" }}
        >
          <Text>By</Text>
          <Text color={"green.400"}>{author}</Text>
        </HStack>

        <Flex color={"gray.500"} alignItems={"center"} mt={"6px"}>
          <Box>
            <RatingSystem rating={star} />
          </Box>
          <Spacer />
          <Box
            fontSize={{
              base: "10px",
              md: "12px",
              lg: "14px",
            }}
          >
            Giống {gender}
          </Box>
        </Flex>
      </CardBody>
      <Divider color={"gray.300"} />
      <CardFooter justify="space-between" alignItems={"center"} p={"12px"}>
        <Text color={"green.400"} fontWeight={"700"} fontSize={"lg"}>
          {price && numberWithCommas(price)}
        </Text>
        <Button
          leftIcon={<Icon as={ViewIcon} boxSize={4}></Icon>}
          bgColor={"green.100"}
          color={"green.400"}
          variant="outline"
          fontSize={"md"}
          _hover={{
            background: "green.500",
            color: "white",
            transform: "translateY(-2px)",
          }}
        >
          {views}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SinglePost;

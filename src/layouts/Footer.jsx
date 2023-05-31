import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { BsFacebook } from "react-icons/bs";
import { FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const support = ["Trung tâm trợ giúp", "An toàn mua bán", "Liên hệ hỗ trợ"];
  const socialLinks = [BsFacebook, FaYoutube, FaLinkedin];

  return (
    <Box bg={"gray.200"} padding={"24px"} mt={"40px"} as={"footer"}>
      <Container maxW={"container.xl"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={"20px"}
          fontSize={{base: "14px", sm: "18px"}}
        >
          <GridItem>
            <Heading as={"h4"} fontSize={"18px"} mb="8px">
              Thông tin liên hệ
            </Heading>
            <Text>Tel : 098.8888.182</Text>
            <Text>Email : support@petmart.vn</Text>
          </GridItem>
          <GridItem>
            <Heading as={"h4"} fontSize={"18px"} mb="8px">
              Hỗ trợ
            </Heading>
            <Flex flexDirection={"column"} columnGap={"8px"}>
              {support.map((item) => {
                return <Link key={item}>{item}</Link>;
              })}
            </Flex>
          </GridItem>
          <GridItem>
            <Heading as={"h4"} fontSize={"18px"} mb="8px">
              Về chúng tôi
            </Heading>
            <Text>
              Trang web đăng tin chia sẻ miễn phí thông tin về thú cưng, vật
              nuôi nhằm giúp người mua và người cho bán tương tác với nhau không
              qua trung gian môi giới.
            </Text>
          </GridItem>
          <GridItem ml={"12px"}>
            <Heading as={"h4"} fontSize={"18px"} mb="6px">
              Liên kết
            </Heading>
            <Flex mt={"8px"} columnGap={"20px"}>
              {socialLinks.map((item) => {
                return (
                  <Link key={item}>
                    <Icon
                      as={item}
                      _hover={{
                        color: "pink.500",
                      }}
                      boxSize={6}
                    ></Icon>
                  </Link>
                );
              })}
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

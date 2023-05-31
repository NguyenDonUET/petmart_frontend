import { BsShieldPlus } from "react-icons/bs";
import { MdOutlineReportGmailerrorred, MdPets } from "react-icons/md";
import { SiSourceforge } from "react-icons/si";
import { AiOutlineEye } from "react-icons/ai";
import { TfiRulerAlt } from "react-icons/tfi";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import SubTitle from "../../components/PostDetail/SubTitle";
const PostInformation = ({ postInfo }) => {
  const {
    weight,
    vaccination,
    age,
    gender,
    address,
    commune,
    district,
    province,
    description,
  } = postInfo;
  const place = `${address},  ${commune},  ${district},  ${province}`;
  return (
    <Box my={"32px"} fontSize={{base: '14px', sm: '16px'}}>
      <SubTitle>Thông tin chi tiết</SubTitle>
      <SimpleGrid columns={{base: '1', sm: '2'}} spacing={4}>
        <Text>
          <Icon as={TfiRulerAlt} /> Cân nặng: {weight}
        </Text>
        <Text>
          <Icon as={SiSourceforge} mr={"4px"} />
          Giống thú cưng: {gender}
        </Text>
        <Text>
          <Icon as={BsShieldPlus} mr={"4px"} />
          Tiêm phòng: {vaccination ? "có" : "không"}
        </Text>
        <Text>
          <Icon as={MdPets} mr={"4px"} />
          Độ tuổi: {age} tháng
        </Text>
      </SimpleGrid>
      <SubTitle>Đặc điểm nổi bật</SubTitle>
      <Text maxW={"90%"}>{description}</Text>
      <Flex mt={"12px"} gap={3} flexDirection={{base: 'column', sm: 'row'}}>
        <Text fontWeight={"bold"}>Địa chỉ:</Text>
        <Text>{place}</Text>
      </Flex>
    </Box>
  );
};

export default PostInformation;

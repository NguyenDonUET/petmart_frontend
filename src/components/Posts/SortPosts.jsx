import {
  Box,
  Divider,
  Flex,
  FormLabel,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TotalPosts from "./TotalPosts";
import { useDispatch } from "react-redux";
import { getPosts, sortShowPostList } from "../../redux/actions/postActions";
import { createFilterQuery } from "../../utils/createFilterQuery";
import { setSortQuery } from "../../redux/slices/post";
const sortBy = [
  { text: "Ngày đăng (mới đến cũ)", value: "", property: "" },
  // { text: "Ngày đăng (cũ đến mới)", value: "desc", property: "createdDate" },
  { text: "Giá (giảm dần)", value: "desc", property: "price" },
  // { text: "Giá (giảm dần)", value: "desc", property: "price" },
  { text: "Lượt đánh giá (giảm dần)", value: "desc", property: "star" },
  { text: "Lượt xem (giảm dần)", value: "desc", property: "views" },
];
const SortPosts = () => {
  const [selectVal, setSelectVal] = useState(0);
  const dispatch = useDispatch();
  const handleSortPosts = ({ target }) => {
    setSelectVal(target.value);
  };

  useEffect(() => {
    let sb = sortBy[selectVal].property.length;
    console.log("🚀 ~ sb:", sb);
    let ob = sortBy[selectVal].value.length;
    console.log("🚀 ~ ob:", ob);
    let newSortQuery = `&orderBy=${sortBy[selectVal].property}&order=${sortBy[selectVal].value}`;
    if (sb.length === 0 || ob.length === 0) {
      newSortQuery = "";
      console.log("empty");
    }
    console.log("🚀 ~ newSortQuery:", newSortQuery);
    // console.log("🚀 ~ sortQuery:", newSortQuery);
    dispatch(setSortQuery(newSortQuery));
    dispatch(getPosts());
  }, [selectVal]);

  useEffect(() => {
    dispatch(setSortQuery(""));
  }, []);

  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} mb={"10px"}>
      <TotalPosts />
      <Divider
        orientation="horizontal"
        borderColor="gray.500"
        flexBasis={{ base: "20%", sm: "40%", md: "50%", lg: "65%" }}
      />
      <Box flexBasis={{ base: "40%", sm: "30%", md: "30%", lg: "20%" }}>
        <Select
          placeholder=""
          value={selectVal}
          onChange={(event) => handleSortPosts(event)}
        >
          {sortBy &&
            sortBy.map((item, index) => {
              return (
                <option key={index} value={index}>
                  {item.text}
                </option>
              );
            })}
        </Select>
      </Box>
    </Flex>
  );
};

export default SortPosts;

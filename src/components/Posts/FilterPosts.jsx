import { Box, Button, Flex, HStack, Icon, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { filterPosts, getPosts } from "../../redux/actions/postActions";
import { decodeParams } from "../../utils/decodeParams";
import FilterForm from "../FilterForm";
import Searbar from "../Searbar";
import { createFilterQuery } from "../../utils/createFilterQuery";
import { setFilterParams } from "../../redux/slices/post";

const filterCategory = [
  {
    title: "Tỉnh",
    name: "province",
    data: {
      displayText: ["Tất cả", "Hà nội", "Bắc Ninh"],
    },
  },
  {
    title: "Loại thú cưng",
    name: "species",
    data: {
      displayText: ["Tất cả", "Chó", "Mèo", "Khác"],
    },
  },
  {
    title: "Tuổi (tháng)",
    name: "startAge",
    data: {
      displayText: ["Tất cả", "0-12", "12-36", "lớn hơn 36"],
    },
  },
  {
    title: "Giới tính",
    name: "gender",
    data: {
      displayText: ["Tất cả", "Đực", "Cái"],
    },
  },
  {
    title: "Cân nặng",
    name: "weight",
    data: {
      displayText: ["Tất cả", "2kg", "4kg"],
    },
  },
  {
    title: "Tiêm vắc xin",
    name: "vaccination",
    data: {
      displayText: ["Tất cả", "đã tiêm", "chưa tiêm"],
    },
  },
];

const FilterPosts = () => {
  const [query, setQuery] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState("");
  const { search } = useLocation();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { loading, error, postList, filterParams } = post;

  const updateParams = (param) => {
    console.log("🚀 ~ param:", param);
    setQuery((prev) => [...prev, param]);
  };

  const filterProducts = () => {
    // chuyển mảng object thành 1 object
    let newParams = query.reduce((result, currentObj) => {
      return { ...result, ...currentObj };
    }, {});
    // đổi params trên url
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (search !== "") {
      const newParams = query.reduce((result, currentObj) => {
        return { ...result, ...currentObj };
      }, {});
      // loại bỏ những value là undefined
      for (const key in newParams) {
        if (newParams[key] === undefined) {
          delete newParams[key];
        }
      }
      // console.log("run here", search);
      // XÓA những value là undefined trên URL
      setSearchParams(newParams);
      const filters = createFilterQuery(newParams);
      console.log("FilterParams", filters);
      dispatch(setFilterParams(filters));
      dispatch(getPosts());
    }
  }, [searchParams]);

  return (
    <Box
      flexBasis={"20%"}
      mr={{ base: "0px", md: "10px" }}
      mb={{ base: "10px" }}
    >
      <Flex flexDirection={"column"} gap={"16px"}>
        {/* Search bar */}
        <Box>
          <HStack>
            <Input
              bgColor={"gray.50"}
              borderRadius={"md"}
              width={"80%"}
              type="text"
              placeholder="Nhập tên thú nuôi"
              border={"none"}
              onChange={(e) =>
                updateParams({
                  q: e.target.value,
                })
              }
            ></Input>
          </HStack>
        </Box>
        {filterCategory.map((category, index) => {
          return (
            <Box key={index}>
              <FilterForm category={category} updateParams={updateParams} />
            </Box>
          );
        })}
        <Button
          leftIcon={<Icon as={FiFilter} />}
          bgColor={"steelblue"}
          color={"white"}
          _hover={{
            bgColor: "orange.400",
          }}
          onClick={() => filterProducts()}
        >
          Lọc bài đăng
        </Button>
      </Flex>
    </Box>
  );
};

export default FilterPosts;

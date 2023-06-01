import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminAccountTable from "../../components/Admin/AdminAccountTable";
import AdminPostTable from "../../components/Admin/AdminPostsTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions/postActions";
import { setShowAdminPostList } from "../../redux/slices/post";
import LoadingList from "../../components/Admin/LoadingList";

const mapStatus = {
  0: "",
  1: "false",
  2: "true",
};
const tableHeader = [
  "Tên bài",
  "Chủ sở hữu",
  "Địa chỉ",
  "Trạng thái",
  "Số lượng",
  "Lượt xem",
  "Lượt đánh giá",
  "Hành động",
];

const styleText = {
  textTransform: "uppercase",
  fontSize: "18px",
  fontWeight: "600",
};

const AdminPostList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const { adminPostList, showAdminPostList, loading, error } = useSelector(
    (state) => state.post
  );

  const handleChange = (index) => {
    const newList = adminPostList.filter((post) => {
      return post.isApproved.toString().includes(mapStatus[index]);
    });
    dispatch(setShowAdminPostList(newList));
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <Box marginX={8} paddingTop={5}>
      <Tabs
        padding={3}
        bgColor={"white"}
        onChange={(index) => handleChange(index)}
      >
        <TabList gap={"82px"}>
          <Tab sx={styleText}>Tất cả</Tab>
          <Tab sx={styleText}>Chưa duyệt</Tab>
          <Tab sx={styleText}>Đã duyệt</Tab>
        </TabList>
        <TabPanels>
          {loading && <LoadingList />}
          {error && <h2>{error}</h2>}

          {!error && !loading && (
            <AdminPostTable
              tableHeader={tableHeader}
              posts={showAdminPostList}
            />
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPostList;

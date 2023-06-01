import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  position,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminAccountTable from "../../components/Admin/AdminAccountTable";
import { useDispatch, useSelector } from "react-redux";
import { getUserAccountList } from "../../redux/actions/userActions";
import { setIsApproveAccount, setShowUserList } from "../../redux/slices/user";
import LoadingList from "../../components/Admin/LoadingList";

const mapRole = {
  0: "",
  1: "seller",
  2: "buyer",
};
const UserAccountList = () => {
  const toast = useToast();

  const dispatch = useDispatch();
  const { userList, showUserList, loading, error, isApproveAccount } =
    useSelector((state) => state.user);

  const updateUserList = (index) => {
    console.log("update userList");
    const newList = userList.filter((user) =>
      user.role.includes(mapRole[index])
    );
    dispatch(setShowUserList(newList));
  };
  useEffect(() => {
    dispatch(getUserAccountList());
  }, []);

  // hiển thị thông báo khi approved
  useEffect(() => {
    if (isApproveAccount) {
      toast({
        title: "Xac thực thành công",
        status: "success",
        isClosable: true,
        position: "top",
      });
      dispatch(setIsApproveAccount(false));
      dispatch(getUserAccountList());
    }
  }, [isApproveAccount]);

  // hiển thị thông báo lỗi
  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
    }
  }, [isApproveAccount]);

  const tableHeader = [
    "Tài khoản",
    "Loại",
    "Trạng thái",
    "Số điện thoại",
    "Địa chỉ",
    "Hành động",
  ];
  const styleText = {
    textTransform: "uppercase",
    fontSize: "18px",
    fontWeight: "600",
  };

  return (
    <>
      {!userList && <LoadingList />}
      {userList && (
        <Box marginX={8} paddingTop={5}>
          {error}
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <Tabs
            padding={3}
            onChange={(index) => updateUserList(index)}
            bgColor={"white"}
          >
            <TabList gap={"82px"}>
              <Tab sx={styleText}>Tất cả</Tab>
              <Tab sx={styleText}>Người bán</Tab>
              <Tab sx={styleText}>Người mua</Tab>
            </TabList>
            <TabPanels>
              {loading && <LoadingList />}
              {!loading && (
                <AdminAccountTable
                  tableHeader={tableHeader}
                  data={showUserList}
                />
              )}
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default UserAccountList;

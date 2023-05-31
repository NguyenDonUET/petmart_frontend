import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

const UserInfo = ({ userInfo }) => {
  //   console.log("🚀 ~ userInfo:", userInfo);
  return (
    <>
      {userInfo && (
        <Grid
          templateColumns={"repeat(2, 1fr)"}
          gap={4}
          maxWidth={"400px"}
          mb={"14%"}
        >
          <GridItem>
            <Text as={"b"}>Email :</Text>
          </GridItem>
          <GridItem>{userInfo.user.email}</GridItem>
          <GridItem>
            <Text as={"b"}>Số điện thoại :</Text>
          </GridItem>
          <GridItem>{userInfo.user.phone}</GridItem>
          <GridItem>
            <Text as={"b"}>Địa chỉ :</Text>
          </GridItem>
          <GridItem>{userInfo.user.address}</GridItem>
        </Grid>
      )}
    </>
  );
};

export default UserInfo;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCreatedPosts, getFavouritePosts } from "../redux/actions/postActions";
import { setCreatedPostList, setFavouritePostList } from "../redux/slices/post";
import {
   Tabs,
   TabList,
   TabPanels,
   Tab,
   Grid,
   GridItem,
   SimpleGrid,
   TabPanel,
   Box,
   Image,
   Text,
   Textarea,
   Button,
   Flex,
   Spacer,
   Tooltip,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   FormErrorMessage,
   Icon,
   useToast,
} from "@chakra-ui/react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
} from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { IoKey, IoKeyOutline } from 'react-icons/io5';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import LoadingList from "../components/Admin/LoadingList";
import SinglePost from "../components/Posts/SinglePost";
import { editPassword, logout } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { setIsChangedPassword } from "../redux/slices/user";


const mapApprove = {
   0: "true"
}


const ProfilePage = () => {
   // isOpen cho modal
   const [modalEdit, setModalEdit] = useState(false);
   const [modalPassword, setModalPassword] = useState(false);

   // Show Icons
   const [showOldPassword, setShowOldPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);

   // lấy dữ liệu
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const toast = useToast();
   const user = useSelector((state) => state.user);
   const post = useSelector((state) => state.post);
   const { loading, createdPostList, favouritePostList } = post;
   const { userInfo, error, errorChangedPassword, isChangedPassword } = user;
   console.log(userInfo);
   let expriredPosts = [];
   let newCreatedPostList = [];

   // Modal
   const { isOpen, onOpen, onClose } = useDisclosure();

   if (createdPostList) {
      expriredPosts = createdPostList.filter((post) => (moment(post.endDate).diff(moment(), "days") < 0));
      newCreatedPostList = createdPostList.filter((post) => (moment(post.endDate).diff(moment(), "days") >= 0));
   }

   // cập nhật danh sách post
   useEffect(() => {
      dispatch(setIsChangedPassword(false));
      dispatch(getCreatedPosts(userInfo.user.id));
      dispatch(getFavouritePosts(userInfo.user.id));
   }, []);

   // hiển thị thông báo nếu có lỗi
   useEffect(() => {
      console.log(isChangedPassword);
      if (user.isChangedPassword) {
         toast({
            description: "Đổi mật khẩu thành công. Xin vui lòng đăng nhập lại.",
            status: "success",
            isClosable: true,
            position: "top",
         });
         dispatch(logout());
         navigate(`/`);
      }
      if (errorChangedPassword) {
         toast({
            description: errorChangedPassword,
            status: "error",
            isClosable: true,
            position: "top",
         });
      }
   }, [isChangedPassword]);

   // handleModal
   const handleOpenModalEdit = () => {
      setModalEdit(true);
   }

   const handleOpenModalPassword = () => {
      setModalPassword(true);
   }

   const handleCloseModalEdit = () => {
      setModalEdit(false);
   }

   const handleCloseModalPassword = () => {
      setModalPassword(false);
   }

   const handleShowOldPassword = () => {
      setShowOldPassword(!showOldPassword);
   }

   const handleShowNewPassword = () => {
      setShowNewPassword(!showNewPassword);
   }

   // submit
   const handleSubmit = (values) => {
      //dispatch(updateUser(values));
      console.log(values);
   }

   const handleEditPasswordSubmit = (values) => {
      console.log(values);
      dispatch(editPassword(values));

      // else {
      //    toast({
      //       description: error,
      //       status: "error",
      //       isClosable: true,
      //       position: "top",
      //    });
      // }

   }

   const styleText = {
      textTransform: "uppercase",
      fontSize: "18px",
      fontWeight: "600",
   };

   return (
      <>
         <Box
            height={"calc(50vh - 84px)"}
            bgImage={"url('./images/user.png')"}
            bgPosition="center"
            bgSize={"cover"}
            bgRepeat="no-repeat"
            position={"relative"}
         >
            <Avatar
               size={{ base: 'xl', md: '2xl' }}
               position={'absolute'}
               //top={"calc(25vh + 50px)"}
               //top={"calc(50vh - 134px)"}
               top={{ base: 'calc(50vh - 120px)', sm: '', md: 'calc(50vh - 134px)' }}
               left={{ base: '6%', sm: "6%", md: "6%" }}
               name={userInfo.user.username}
               border={'2px solid #FFFFFF'}
            />
            <Flex
               flexDirection={{ base: 'column', sm: 'row' }}
               width={'calc(100vw - 11% - 145px)'}
               justifyContent={{ sm: "space-between" }}
               position={'absolute'}
               //top={"calc(35vh + 35px)"}
               top={"calc(50vh - 80px)"}
               left={"calc(6% + 145px)"}
            >
               <Text
                  as={'b'}
                  fontSize={'xl'}
                  minWidth={'20vw'}
               >
                  {userInfo.user.username}
               </Text>
               <Flex
               // justifyContent={'end'}
               >
                  <Tooltip
                     label={'Đổi mật khẩu'}
                     aria-label={'Đổi mật khẩu'}
                  >
                     <IconButton
                        size={{ base: 'sm', md: 'md' }}
                        mt={'3px'}
                        colorScheme="teal"
                        variant={"outline"}
                        aria-label='Đổi mật khẩu'
                        icon={<Icon as={IoKeyOutline} />}
                        onClick={handleOpenModalPassword}
                     />
                  </Tooltip>
                  <Tooltip
                     label={'Chỉnh sửa thông tin cá nhân'}
                     aria-label={'Chỉnh sửa thông tin cá nhân'}
                  >
                     <IconButton
                        size={{ base: 'sm', md: 'md' }}
                        mt={'3px'}
                        ml={"10px"}
                        colorScheme="teal"
                        variant={"outline"}
                        aria-label='Chỉnh sửa thông tin cá nhân'
                        icon={<EditIcon />}
                        onClick={handleOpenModalEdit}
                     />
                  </Tooltip>
               </Flex>
            </Flex>
            {userInfo.user.role &&
               userInfo.user.role == 'admin' &&
               <Text
                  display={{ base: 'none', sm: 'block' }}
                  fontSize={'md'}
                  position={'absolute'}
                  // top={"calc(35vh + 65px)"}
                  top={"calc(50vh - 50px)"}
                  left={"calc(6% + 145px)"}
               >
                  Admin hệ thống
               </Text>
            }
            {userInfo.user.role &&
               userInfo.user.role == 'seller' &&
               <Text
                  display={{ base: 'none', sm: 'block' }}
                  fontSize={'md'}
                  position={'absolute'}
                  // top={"calc(35vh + 65px)"}
                  top={"calc(50vh - 50px)"}
                  left={"calc(6% + 145px)"}
               >
                  Người bán
               </Text>
            }
            {userInfo.user.role &&
               userInfo.user.role == 'buyer' &&
               <Text
                  display={{ base: 'none', sm: 'block' }}
                  fontSize={'md'}
                  position={'absolute'}
                  // top={"calc(35vh + 65px)"}
                  top={"calc(50vh - 50px)"}
                  left={"calc(6% + 145px)"}
               >
                  Người mua
               </Text>
            }
         </Box>
         <Box
            marginX={"8"}
            mt={'10vh'}
         >
            {true && (
               <Tabs
                  padding={3}
                  paddingX={{ base: '0' }}
                  //onChange={(index) => updatePostList(index)}
                  bgColor={'white'}
               >
                  <TabList
                     gap={{ md: "82px" }}
                  >
                     <Tab >
                        <Text fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                           Thông tin tài khoản
                        </Text>
                     </Tab>
                     <Tab >
                        <Text fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                           Bài viết yêu thích
                        </Text>
                     </Tab>
                     <Tab >
                        <Text fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                           Bài viết đã đăng
                        </Text>
                     </Tab>
                     {
                        userInfo.user.role == "seller"
                        && createdPostList
                        && createdPostList.length > 0
                        && userInfo.user.id == createdPostList[0].creator.id
                        &&
                        <Tab >
                           <Text fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                              Bài viết đã hết hạn
                           </Text>
                        </Tab>
                     }
                  </TabList>
                  <TabPanels>
                     <TabPanel>
                        <Grid
                           templateColumns={'repeat(2, 1fr)'}
                           gap={4}
                           maxWidth={'400px'}
                        >
                           <GridItem>
                              <Text
                                 as={'b'}
                                 fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}
                              >
                                 Email :
                              </Text>
                           </GridItem>
                           <GridItem>
                              <Text fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                                 {userInfo.user.email}
                              </Text>
                           </GridItem>
                           <GridItem>
                              <Text as={'b'} fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                                 Số điện thoại :
                              </Text>
                           </GridItem>
                           <GridItem>
                              <Text fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                                 {userInfo.user.phone}
                              </Text>
                           </GridItem>
                           <GridItem>
                              <Text as={'b'} fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                                 Địa chỉ :
                              </Text>
                           </GridItem>
                           <GridItem>
                              <Text fontSize={{ base: '12px', sm: '12px', md: '14px', lg: 'md' }}>
                                 {userInfo.user.address}
                              </Text>
                           </GridItem>
                        </Grid>
                     </TabPanel>
                     <TabPanel>
                        {loading && <LoadingList />}
                        {!loading &&
                           <Grid
                              templateColumns={{
                                 base: "repeat(1, 1fr)",
                                 sm: "repeat(2, 1fr)",
                                 md: "repeat(3, 1fr)",
                                 lg: "repeat(4, 1fr)",
                              }}
                              gap={1}
                           >
                              {favouritePostList &&
                                 favouritePostList.length > 0 &&
                                 favouritePostList.map((post) => {
                                    return (
                                       <GridItem key={post.id}>
                                          <SinglePost post={post} />
                                       </GridItem>
                                    );
                                 })}
                           </Grid>
                        }
                        {favouritePostList &&
                           favouritePostList.length == 0 &&
                           "Danh sách bài viết ưa thích sẽ được hiển thị tại đây"}
                     </TabPanel>
                     <TabPanel>
                        {loading && <LoadingList />}
                        {!loading &&
                           <Grid
                              templateColumns={{
                                 base: "repeat(1, 1fr)",
                                 sm: "repeat(2, 1fr)",
                                 md: "repeat(3, 1fr)",
                                 lg: "repeat(4, 1fr)",
                              }}
                              gap={1}
                           >
                              {
                                 newCreatedPostList.length > 0 &&
                                 newCreatedPostList.map((post) => {
                                    return (
                                       <GridItem key={post.id}>
                                          <SinglePost post={post} />
                                       </GridItem>
                                    );
                                 })}
                           </Grid>
                        }
                        {newCreatedPostList &&
                           newCreatedPostList.length == 0 &&
                           "Danh sách bài viết đã đăng sẽ được hiển thị tại đây"}
                     </TabPanel>
                     {
                        userInfo.user.role == "seller"
                        && createdPostList
                        && createdPostList.length > 0
                        && userInfo.user.id == createdPostList[0].creator.id
                        &&
                        <TabPanel>
                           {loading && <LoadingList />}
                           {!loading &&
                              <Grid
                                 templateColumns={{
                                    base: "repeat(1, 1fr)",
                                    sm: "repeat(2, 1fr)",
                                    md: "repeat(3, 1fr)",
                                    lg: "repeat(4, 1fr)",
                                 }}
                                 gap={1}
                              >
                                 {
                                    expriredPosts.length > 0 &&
                                    expriredPosts.map((post) => {
                                       return (
                                          <GridItem key={post.id}>
                                             <SinglePost post={post} />
                                          </GridItem>
                                       );
                                    })}
                              </Grid>
                           }
                           {expriredPosts &&
                              expriredPosts.length == 0 &&
                              "Danh sách bài viết đã hết hạn sẽ hiển thị tại đây"}
                        </TabPanel>
                     }
                  </TabPanels>
               </Tabs>
            )}
         </Box>
         <Modal
            blockScrollOnMount={false}
            isOpen={modalEdit}
            onClose={handleCloseModalEdit}
            closeOnOverlayClick={false}
            size={{base: 'xs', md: 'sm'}}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  <Text
                     display={'flex'}
                     justifyContent={'center'}
                     color={"#f5897e"}
                     py={'4'}
                  >
                     CHỈNH SỬA THÔNG TIN CÁ NHÂN
                  </Text>

               </ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Formik
                     initialValues={{
                        username: userInfo.user.username,
                        citizen: userInfo.user.citizen,
                        address: userInfo.user.address,
                        phone: userInfo.user.phone,
                     }}
                     onSubmit={handleSubmit}
                     validationSchema={Yup.object().shape({
                        username: Yup.string().required("Vui lòng nhập Tên người dùng"),
                        citizen: Yup.string()
                           .required("Vui lòng nhập Số Căn Cước Công Dân")
                           .min(12, "Số Căn Cước Công Dân cần có 12 chữ số")
                           .test(
                              "is number",
                              "Vui lòng chỉ nhập số",
                              (value) => !isNaN(parseInt(value))
                           ),
                        address: Yup.string().required("Vui lòng nhập Địa chỉ thường trú"),
                        phone: Yup.string()
                           .required("Vui lòng nhập Số điện thoại")
                           .matches(
                              /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                              "Số điện thoại không hợp lệ"
                           ),
                     })
                     }
                  >
                     {
                        ({
                           values,
                           errors,
                           touched,
                           handleChange,
                           handleBlur,
                           handleSubmit,
                           isSubmitting,
                           setFieldValue,
                        }) => (
                           <Form id="updateUser">
                              <Field name='username'>
                                 {
                                    ({ field, form }) => (
                                       <FormControl
                                          isRequired
                                          isInvalid={form.errors.username && form.touched.username}
                                          mb={'4'}
                                       >
                                          <FormLabel>Tên người dùng</FormLabel>
                                          <Input {...field} />
                                          <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                       </FormControl>
                                    )
                                 }
                              </Field>

                              <Field name='citizen'>
                                 {
                                    ({ field, form }) => (
                                       <FormControl
                                          isInvalid={form.errors.citizen && form.touched.citizen}
                                          mb={'4'}
                                       >
                                          <FormLabel>Số Căn cước công dân</FormLabel>
                                          <Input {...field} disabled/>
                                          <FormErrorMessage>{form.errors.citizen}</FormErrorMessage>
                                       </FormControl>
                                    )
                                 }
                              </Field>

                              <Field name='phone'>
                                 {
                                    ({ field, form }) => (
                                       <FormControl
                                          isRequired
                                          isInvalid={form.errors.phone && form.touched.phone}
                                          mb={'4'}
                                       >
                                          <FormLabel>Số điện thoại</FormLabel>
                                          <Input {...field} />
                                          <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                                       </FormControl>
                                    )
                                 }
                              </Field>

                              <Field name="address">
                                 {
                                    ({ field, form }) => (
                                       <FormControl
                                          isRequired
                                          isInvalid={
                                             form.errors.address && form.touched.address
                                          }
                                          mb={"4"}
                                       >
                                          <FormLabel>Địa chỉ thường trú</FormLabel>
                                          <Textarea {...field} />
                                          <FormErrorMessage>
                                             {form.errors.address}
                                          </FormErrorMessage>
                                       </FormControl>
                                    )
                                 }
                              </Field>
                           </Form>
                        )
                     }
                  </Formik>
               </ModalBody>

               <ModalFooter display={"flex"} justifyContent={"center"}>
                  <Button
                     type="submit"
                     colorScheme="blue"
                     mr={3}
                     bg="#f5897e"
                     _hover={{ bg: "#f56051" }}
                     form="updateUser"
                  >
                     Xác nhận
                  </Button>
                  <Button variant="ghost" onClick={handleCloseModalEdit}>
                     Hủy bỏ
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
         <Modal
            blockScrollOnMount={false}
            isOpen={modalPassword}
            onClose={handleCloseModalPassword}
            closeOnOverlayClick={false}
            size={{base: 'xs', md: 'sm'}}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  <Text
                     display={'flex'}
                     justifyContent={'center'}
                     color={"#f5897e"}
                     py={'4'}
                  >
                     ĐỔI MẬT KHẨU
                  </Text>

               </ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Formik
                     initialValues={{
                        oldPassword: '',
                        newPassword: '',
                     }}
                     onSubmit={handleEditPasswordSubmit}
                     validationSchema={Yup.object().shape({
                        oldPassword: Yup.string()
                           .required("Vui lòng nhập Mật khẩu hiện tại")
                           .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
                        newPassword: Yup.string()
                           .required("Vui lòng nhập Mật khẩu mới")
                           .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
                     })
                     }
                  >
                     {
                        ({
                           values,
                           errors,
                           touched,
                           handleChange,
                           handleBlur,
                           handleSubmit,
                           isSubmitting,
                           setFieldValue,
                        }) => (
                           <Form id="editPassword">
                              <Field name="oldPassword">
                                 {({ field, form }) => (
                                    <FormControl
                                       isRequired
                                       isInvalid={
                                          form.errors.oldPassword && form.touched.oldPassword
                                       }
                                       mb={"4"}
                                    >
                                       <FormLabel>Mật khẩu hiện tại</FormLabel>
                                       <InputGroup>
                                          <Input
                                             {...field}
                                             type={!showOldPassword ? "password" : "text"}
                                          />
                                          <InputRightElement width={"4.5rem"}>
                                             <IconButton
                                                h={"1.75rem"}
                                                aria-label="Hiển thị"
                                                bg={"white"}
                                                icon={
                                                   showOldPassword ? (
                                                      <ViewIcon />
                                                   ) : (
                                                      <ViewOffIcon />
                                                   )
                                                }
                                                onClick={handleShowOldPassword}
                                             />
                                          </InputRightElement>
                                       </InputGroup>

                                       <FormErrorMessage>
                                          {form.errors.oldPassword}
                                       </FormErrorMessage>
                                    </FormControl>
                                 )}
                              </Field>
                              <Field name="newPassword">
                                 {({ field, form }) => (
                                    <FormControl
                                       isRequired
                                       isInvalid={
                                          form.errors.newPassword && form.touched.newPassword
                                       }
                                       mb={"4"}
                                    >
                                       <FormLabel>Mật khẩu mới</FormLabel>
                                       <InputGroup>
                                          <Input
                                             {...field}
                                             type={!showNewPassword ? "password" : "text"}
                                          />
                                          <InputRightElement width={"4.5rem"}>
                                             <IconButton
                                                h={"1.75rem"}
                                                aria-label="Hiển thị"
                                                bg={"white"}
                                                icon={
                                                   showNewPassword ? (
                                                      <ViewIcon />
                                                   ) : (
                                                      <ViewOffIcon />
                                                   )
                                                }
                                                onClick={handleShowNewPassword}
                                             />
                                          </InputRightElement>
                                       </InputGroup>

                                       <FormErrorMessage>
                                          {form.errors.newPassword}
                                       </FormErrorMessage>
                                    </FormControl>
                                 )}
                              </Field>
                           </Form>
                        )
                     }
                  </Formik>
               </ModalBody>

               <ModalFooter display={"flex"} justifyContent={"center"}>
                  <Button
                     type="submit"
                     colorScheme="blue"
                     mr={3}
                     bg="#f5897e"
                     _hover={{ bg: "#f56051" }}
                     form="editPassword"
                  >
                     Xác nhận
                  </Button>
                  <Button variant="ghost" onClick={handleCloseModalPassword}>
                     Hủy bỏ
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
};

export default ProfilePage;

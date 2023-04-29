import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
   Box,
   Button,
   Flex,
   FormControl,
   FormLabel,
   FormErrorMessage,
   Heading,
   IconButton,
   Input,
   InputGroup,
   InputRightElement,
   Text,
   useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";

const LoginPage = () => {
   const [show, setShow] = React.useState(false);
   const navigate = useNavigate();
   // Hook để lấy thông tin về địa chỉ URL hiện tại
   const location = useLocation();
   // Hook để điều hướng tới một địa chỉ URL khác
   const dispatch = useDispatch();
   const redirect = "/";
   const toast = useToast();

   const user = useSelector((state) => state.user);
   const { loading, error, userInfo } = user;

   const handleClick = () => setShow(!show);

   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .required("Vui lòng nhập Email")
         .matches(
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            "Email phải đúng định dạng"
         ),
      password: Yup.string()
         .required("Vui lòng nhập Mật khẩu")
         .min(6, "Mật khẩu cần ít nhất 8 ký tự"),
   });

   const handleLogin = (values) => {
      const { email, password } = values;
      dispatch(login(email, password));
   };

   useEffect(() => {
      // Nếu user đã đăng nhập thành công
      if (userInfo) {
         // Điều hướng tới trang trước đó(nếu trc đó đang checkout thì quay lại trang đó)
         if (location.state?.from) {
            navigate(location.state.from);
         } else {
            // Điều hướng tới trang products
            navigate(redirect);
         }
         toast({
            description: "Bạn đã đăng nhập thành công.",
            status: "success",
            isClosable: true,
            position: "top",
         });
      }
   }, [userInfo, redirect, error, navigate, location.state, toast]);

   return (
      <Flex justifyContent={"center"} alignItems={"center"}>
         <Box w="500px" p={8} borderWidth="1px" borderRadius="lg">
            <Flex justifyContent={"center"}>
               <Heading
                  color={"#f5897e"}
                  as={"h1"}
                  fontSize={"24px"}
                  pb={"24px"}
               >
                  ĐĂNG NHẬP
               </Heading>
            </Flex>

            <Formik
               initialValues={{
                  email: "",
                  password: "",
               }}
               onSubmit={handleLogin}
               validationSchema={validationSchema}
            >
               {(props) => (
                  <Form>
                     <Field name="email">
                        {({ field, form }) => (
                           <FormControl
                              isInvalid={
                                 form.errors.email && form.touched.email
                              }
                              mb={4}
                           >
                              <FormLabel>Email</FormLabel>
                              <Input {...field} placeholder="Nhập email" />
                              <FormErrorMessage>
                                 {form.errors.email}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>

                     <Field name="password">
                        {({ field, form }) => (
                           <FormControl
                              isInvalid={
                                 form.errors.password && form.touched.password
                              }
                              mb={4}
                           >
                              <FormLabel>Password</FormLabel>
                              <InputGroup>
                                 <Input
                                    {...field}
                                    type={show ? "text" : "password"}
                                    placeholder="Nhập mật khẩu"
                                 />
                                 <InputRightElement width={"4.5rem"}>
                                    <IconButton
                                       h={"1.75rem"}
                                       aria-label="Hiển thị"
                                       bg={"white"}
                                       icon={
                                          show ? <ViewIcon /> : <ViewOffIcon />
                                       }
                                       onClick={handleClick}
                                    />
                                 </InputRightElement>
                              </InputGroup>

                              <FormErrorMessage>
                                 {form.errors.password}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>

                     <Text mt={"4"} fontSize={"sm"}>
                        Chưa có tài khoản?
                        <a href="/register" style={{ color: "#0000ff" }}>
                           {" "}
                           Đăng ký
                        </a>
                     </Text>

                     <Button
                        type="submit"
                        colorScheme="blue"
                        bg="#f5897e"
                        _hover={{ bg: "#f56051" }}
                        mt={4}
                     >
                        Đăng nhập
                     </Button>
                  </Form>
               )}
            </Formik>
         </Box>
      </Flex>
   );
};

export default LoginPage;

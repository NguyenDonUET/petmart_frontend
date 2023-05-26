import { useEffect, useState } from "react";
import {
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   IconButton,
   Heading,
   Textarea,
   Button,
   Box,
   Flex,
   FormErrorMessage,
   Text,
   RadioGroup,
   HStack,
   Radio,
   useToast,
   Alert,
   AlertIcon,
   AlertTitle,
   AlertDescription,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterPage() {
   // state for view icon
   const [showPassword, setShowPassword] = useState(false);
   const [showRePassword, setShowRePassword] = useState(false);
   // Hook để lấy thông tin về địa chỉ URL hiện tại
   const location = useLocation();
   const user = useSelector((state) => state.user);
   const { loading, error, userInfo } = user;
   const dispatch = useDispatch();
   const toast = useToast();
   const navigate = useNavigate();
   const redirectToLogin = "/login";
   const handlePassword = () => {
      setShowPassword(!showPassword);
   };

   const handleRePassword = () => {
      setShowRePassword(!showRePassword);
   };

   const handleSignup = (values) => {
      dispatch(signup(values));
   };

   useEffect(() => {
      // Nếu user đã đăng nhập thành công
      if (userInfo) {
         // Điều hướng tới trang trước đó
         if (location.state?.from) {
            navigate(location.state.from);
         } else {
            // Điều hướng tới trang chủ
            navigate("/");
         }
      }
   }, []);

   // validate form
   const validationSchema = Yup.object().shape({
      username: Yup.string().required("Vui lòng nhập Họ tên"),
      citizen: Yup.string()
         .required("Vui lòng nhập Số Căn Cước Công Dân")
         .min(12, "Số Căn Cước Công Dân cần có 12 chữ số")
         .test(
            "is number",
            "Vui lòng chỉ nhập số",
            (value) => !isNaN(parseInt(value))
         )
         .matches(
            /^(0[0-8][0-9]|09[0-6])[0-9]{1}[0-9]{2}[0-9]{6}$/,
            "Vui lòng nhập số Căn Cước hợp lệ"
          ),
      address: Yup.string().required("Vui lòng nhập Địa chỉ thường trú"),
      phone: Yup.string()
         .required("Vui lòng nhập Số điện thoại")
         .matches(
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
            "Số điện thoại không hợp lệ"
         ),
      role: Yup.string()
         .required("Vui lòng chọn vai trò")
         .oneOf(
            ["buyer", "seller"],
            "Vui lòng chọn vai trò người bán hoặc mua"
         ),
      email: Yup.string().required("Vui lòng nhập Email").email(),
      password: Yup.string()
         .required("Vui lòng nhập Mật khẩu")
         .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      repassword: Yup.string()
         .required("Vui lòng nhập Xác nhận mật khẩu")
         .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
   });

   return (
      <Flex justifyContent={"center"} alignItems={"center"}>
         <Box width={"40%"} m={"3"}>
            <Heading
               color={"#f5897e"}
               as={"h1"}
               fontSize={"24px"}
               pb={"24px"}
               display={"flex"}
               justifyContent={"center"}
            >
               ĐĂNG KÝ TÀI KHOẢN
            </Heading>
            <Formik
               initialValues={{
                  username: "",
                  citizen: "",
                  address: "",
                  phone: "",
                  role: "",
                  email: "",
                  password: "",
                  repassword: "",
               }}
               onSubmit={handleSignup}
               validationSchema={validationSchema}
            >
               {(props) => (
                  <Form>
                     {error && (
                        <Alert
                           status="error"
                           flexDirection="column"
                           alignItems="center"
                           justifyContent="center"
                           textAlign="center"
                        >
                           <AlertIcon />
                           <AlertTitle>{error}</AlertTitle>
                        </Alert>
                     )}
                     <Field name="username">
                        {({ field, form }) => (
                           <FormControl
                              isRequired
                              isInvalid={
                                 form.errors.username && form.touched.username
                              }
                              mb={"4"}
                           >
                              <FormLabel>Họ tên</FormLabel>
                              <Input {...field} />
                              <FormErrorMessage>
                                 {form.errors.username}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>
                     <Field name="citizen">
                        {({ field, form }) => (
                           <FormControl
                              isRequired
                              isInvalid={
                                 form.errors.citizen && form.touched.citizen
                              }
                              mb={"4"}
                           >
                              <FormLabel>Số Căn Cước Công Dân</FormLabel>
                              <Input {...field} />
                              <FormErrorMessage>
                                 {form.errors.citizen}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>
                     <Field name="address">
                        {({ field, form }) => (
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
                        )}
                     </Field>
                     <Field name="phone">
                        {({ field, form }) => (
                           <FormControl
                              isRequired
                              isInvalid={
                                 form.errors.phone && form.touched.phone
                              }
                              mb={"4"}
                           >
                              <FormLabel>Số điện thoại</FormLabel>
                              <Input {...field} />
                              <FormErrorMessage>
                                 {form.errors.phone}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>
                     <Field name="role">
                        {({ field, form }) => (
                           <FormControl
                              isRequired
                              isInvalid={form.errors.role && form.touched.role}
                              mb={"4"}
                           >
                              <FormLabel>Bạn là</FormLabel>
                              <RadioGroup
                                 {...field}
                                 onChange={(value) =>
                                    form.setValues({
                                       ...form.values,
                                       role: value,
                                    })
                                 }
                              >
                                 <HStack spacing={"100px"}>
                                    <Radio value="buyer">Người mua</Radio>
                                    <Radio value="seller">Người bán</Radio>
                                 </HStack>
                              </RadioGroup>
                              <FormErrorMessage>
                                 {form.errors.role}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>
                     <Field name="email">
                        {({ field, form }) => (
                           <FormControl
                              isRequired
                              isInvalid={
                                 form.errors.email && form.touched.email
                              }
                              mb={"4"}
                           >
                              <FormLabel>Email</FormLabel>
                              <Input {...field} />
                              <FormErrorMessage>
                                 {form.errors.email}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>
                     <Field name="password">
                        {({ field, form }) => (
                           <FormControl
                              isRequired
                              isInvalid={
                                 form.errors.password && form.touched.password
                              }
                              mb={"4"}
                           >
                              <FormLabel>Mật khẩu</FormLabel>
                              <InputGroup>
                                 <Input
                                    {...field}
                                    type={!showPassword ? "password" : "text"}
                                 />
                                 <InputRightElement width={"4.5rem"}>
                                    <IconButton
                                       h={"1.75rem"}
                                       aria-label="Hiển thị"
                                       bg={"white"}
                                       icon={
                                          showPassword ? (
                                             <ViewIcon />
                                          ) : (
                                             <ViewOffIcon />
                                          )
                                       }
                                       onClick={handlePassword}
                                    />
                                 </InputRightElement>
                              </InputGroup>

                              <FormErrorMessage>
                                 {form.errors.password}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>
                     <Field name="repassword">
                        {({ field, form }) => (
                           <FormControl
                              isRequired
                              isInvalid={
                                 form.errors.repassword &&
                                 form.touched.repassword
                              }
                              mb={"4"}
                           >
                              <FormLabel>Xác nhận mật khẩu</FormLabel>
                              <InputGroup>
                                 <Input
                                    {...field}
                                    type={!showRePassword ? "password" : "text"}
                                 />
                                 <InputRightElement width={"4.5rem"}>
                                    <IconButton
                                       h={"1.75rem"}
                                       aria-label="Hiển thị"
                                       bg={"white"}
                                       icon={
                                          showRePassword ? (
                                             <ViewIcon />
                                          ) : (
                                             <ViewOffIcon />
                                          )
                                       }
                                       onClick={handleRePassword}
                                    />
                                 </InputRightElement>
                              </InputGroup>

                              <FormErrorMessage>
                                 {form.errors.repassword}
                              </FormErrorMessage>
                           </FormControl>
                        )}
                     </Field>

                     <Button
                        isLoading={loading}
                        type="submit"
                        mt={4}
                        colorScheme="blue"
                        bg="#f5897e"
                        _hover={{ bg: "#f56051" }}
                        loadingText="Đăng ký"
                     >
                        Đăng ký
                     </Button>
                     <Text mt={"4"} fontSize={"sm"}>
                        Đã có tài khoản?
                        <a href="/login" style={{ color: "#0000ff" }}>
                           {" "}
                           Đăng Nhập
                        </a>
                     </Text>
                  </Form>
               )}

               {/*  */}
            </Formik>
         </Box>
      </Flex>
   );
}

export default RegisterPage;

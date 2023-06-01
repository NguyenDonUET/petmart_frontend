import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../redux/actions/userActions";

const LoginPage = () => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  // Hook để lấy thông tin về địa chỉ URL hiện tại
  const location = useLocation();
  const dispatch = useDispatch();
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

  // useEffect(() => {
  //   if (!userInfo) return;
  //   // if (isTokenExpired(userInfo.accessToken)) {
  //   //   toast({
  //   //     title: "Session expired",
  //   //     description: "Please log in again to continue.",
  //   //     status: "error",
  //   //     duration: 5000,
  //   //     isClosable: true,
  //   //   });
  //   //   localStorage.clear();
  //   // }
  // }, [userInfo, error, navigate, location.state, toast]);

  useEffect(() => {
    if (userInfo) {
      console.log("userInfo", userInfo);
      toast({
        description: "Đăng nhập thành công.",
        status: "success",
        isClosable: true,
        position: "top",
      });
      navigate("/");
    }
  }, [userInfo]);

  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Box w="500px" p={8} borderWidth="1px" borderRadius="lg">
        <Flex justifyContent={"center"}>
          <Heading color={"#f5897e"} as={"h1"} fontSize={"24px"} pb={"24px"}>
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
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    mb={4}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="Nhập email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
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
                          icon={show ? <ViewIcon /> : <ViewOffIcon />}
                          onClick={handleClick}
                        />
                      </InputRightElement>
                    </InputGroup>

                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Text mt={"4"} fontSize={"sm"}>
                Chưa có tài khoản?
                <Link to="/register" style={{ color: "#0000ff" }}>
                  {" "}
                  Đăng ký
                </Link>
              </Text>

              <Button
                isLoading={loading}
                type="submit"
                colorScheme="blue"
                bg="#f5897e"
                _hover={{ bg: "#f56051" }}
                mt={4}
                loadingText="Đăng nhập"
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

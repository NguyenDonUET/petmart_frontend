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
  NumberInput,
  NumberInputField,
  Select,
  RadioGroup,
  Radio,
  Grid,
  GridItem,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  FormHelperText,
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
import { Field, Form, Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import axios from "axios";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import FilesDropzone from "../components/Posts/FilesDropzone";
import { editPost, getPostById } from "../redux/actions/postActions";
import { speciesGenre } from "./gen";
import { setIsUpdated, setUpdateLoading } from "../redux/slices/post";
import LoadingList from "../components/Admin/LoadingList";

const UpdatePost = () => {
  const [newPost, setNewPost] = useState(null);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [commune, setCommune] = useState([]);
  const [genre, setGenre] = useState([]);
  const [files, setFiles] = useState([]);
  const [endDatee, setEndDatee] = useState(moment().add(7, "days").toDate());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { id: postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { loading, error, singlePost, updateLoading, isUpdated } = post;

  // lấy id bài viết từ đường dẫn /posts/update/:id
  const { id } = useParams();

  // Load tên tỉnh thành vào province
  useEffect(() => {
    const fetchProvince = async () => {
      const result = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setProvince(result.data);
    };
    dispatch(getPostById(id));
    fetchProvince();
  }, []);

  // Xử lý load ảnh
  async function fetchImages(images) {
    let files = [];
    for (let i = 0; i < images.length; i++) {
      try {
        let res = await fetch(images[i]);
        let blob = await res.blob();
        let substring = images[i].split("/");
        let name = substring[substring.length - 1];
        let objectURL = URL.createObjectURL(blob);
        let file = new File([blob], name, { type: blob.type });
        file.preview = objectURL;
        files.push(file);
      } catch (err) {
        console.log(err);
      }
    }
    return files;
  }
  useEffect(() => {
    if (singlePost) {
      fetchImages(singlePost.post.images).then((files) => {
        console.log("🚀 ~ files:", files);
        setFiles(files);
      });
    }
  }, [singlePost]);
  console.log("rerender", files);
  // useEffect(() => {
  //   if (singlePost) {
  //     setFiles([]);
  //     images = singlePost.post.images;
  //     for (let i = 0; i < images.length; i++) {
  //       let substring = images[i].split("/");
  //       let name = substring[substring.length - 1];
  //       fetch(images[i])
  //         .then((res) => res.blob())
  //         .then((blob) => {
  //           let objectURL = URL.createObjectURL(blob);
  //           let file = new File([blob], name, { type: blob.type });
  //           file.preview = objectURL;
  //           console.log("image", file);
  //           // defaultFiles.push(file);
  //           setFiles((prevFiles) => {
  //             return prevFiles.concat(file);
  //           });
  //         });
  //     }
  //   }
  // }, [singlePost]);

  let postInfo = null;
  let author = null;
  let images = [];
  // let defaultFiles = [];

  if (singlePost) {
    postInfo = singlePost.post;
    images = postInfo.images;
    author = singlePost.creator;

    /**
     * Tạo các giá trị mặc định cho province, district , commune, endDate
     */
    let defaultProvince = singlePost.post.province;
    let defaultDistrict = singlePost.post.district;
    let defaultEndDate = singlePost.post.endDate;
    let defaultDate = moment().add(7, "days").toDate();

    let sampleProvince = province.find((p) => p.Name === defaultProvince);
    let defaultGenre = speciesGenre.find((s) => s.Name === postInfo.species);

    if (district.length == 0 && sampleProvince != undefined) {
      setDistrict(sampleProvince.Districts);
      let sampleDistrict = sampleProvince.Districts.find(
        (d) => d.Name === defaultDistrict
      );
      if (commune.length == 0) {
        setCommune(sampleDistrict.Wards);
      }
    }

    if (genre && defaultGenre != undefined && genre.length == 0) {
      setGenre(defaultGenre.Genre);
    }
  }

  const handleProvinceChange = (e, defaultProvince) => {
    const provinceName = e.target.value;
    const result = province.find((c) => c.Name === provinceName);
    setDistrict(result.Districts);
    setCommune([]);
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    const result = district.find((d) => d.Name === districtName);
    setCommune(result.Wards);
  };

  const handleEndDateeChange = (date) => {
    if (date != moment().add(7, "days").toDate()) setEndDatee(date);
    else setEndDatee(moment().add(7, "days").toDate());
  };

  const handleEndDateSelect = (date) => {
    setEndDatee(date);
  };

  const handleSpeciesChange = (e) => {
    const speciesName = e.target.value;
    const result = speciesGenre.find((s) => s.Name === speciesName);
    setGenre(result.Genre);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tiêu đề cho bài viết"),
    species: Yup.string()
      .required("Vui lòng chọn trường này")
      .oneOf(
        ["Chó", "Mèo", "Chim", "Gà", "Chuột Hamster", "Khác"],
        "Vui lòng chọn trường này"
      ),
    gender: Yup.string()
      .required("Vui lòng chọn trường này")
      .oneOf(["Đực", "Cái"], "Vui lòng chọn trường này"),
    genre: Yup.string().required("Vui lòng chọn trường này"),
    weight: Yup.number()
      .required("Vui lòng chọn trường này")
      .positive("Cân nặng phải là một số dương"),
    age: Yup.number()
      .required("Vui lòng chọn trường này")
      .positive("Tuổi phải là một số dương"),
    quantity: Yup.number()
      .required("Vui lòng chọn trường này")
      .positive("Tuổi phải là một số dương"),
    price: Yup.number()
      .required("Vui lòng chọn trường này")
      .positive("Tuổi phải là một số dương"),
    vaccination: Yup.boolean().required("Vui lòng chọn trường này"),
    description: Yup.string().required("Vui lòng nhập trường này"),
    province: Yup.string().required("Vui lòng nhập trường này"),
    district: Yup.string().required("Vui lòng nhập trường này"),
    commune: Yup.string().required("Vui lòng nhập trường này"),
    address: Yup.string().required("Vui lòng nhập trường này"),
    images: Yup.array()
      .min(3, "Upload tối thiểu 3 ảnh, vui lòng tải lại tối thiểu 3 ảnh")
      .required("Vui lòng đăng ảnh minh họa"),
  });

  const handleUpdatePost = () => {
    // console.log("🚀 ~ newPost:", newPost);
    dispatch(editPost(postId, newPost));
  };

  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
    if (isUpdated && !error) {
      toast({
        description: "Sửa bài thành công",
        status: "success",
        position: "top",
        isClosable: true,
      });
      dispatch(setIsUpdated(false));
      navigate(`/posts/${postId}`);
    }
    // console.log("isUpdated", isUpdated);
  }, [error, isUpdated]);

  useEffect(() => {
    dispatch(setUpdateLoading(false));
  }, []);
  return (
    <>
      {loading && <LoadingList />}
      {error && <Text>{error}</Text>}
      {!loading && postInfo && (
        <Flex justifyContent={"center"}>
          <Box width={"40%"} m={"3"}>
            <Heading
              color={"#f5897e"}
              as={"h1"}
              fontSize={"24px"}
              pb={"24px"}
              display={"flex"}
              justifyContent={"center"}
            >
              CHỈNH SỬA BÀI ĐĂNG
            </Heading>
            <Formik
              initialValues={{
                title: postInfo.title,
                province: postInfo.province,
                district: postInfo.district,
                commune: postInfo.commune,
                address: postInfo.address,
                species: postInfo.species,
                quantity: postInfo.quantity,
                gender: postInfo.gender,
                genre: postInfo.genre,
                price: postInfo.price,
                weight: postInfo.weight,
                age: postInfo.age,
                vaccination: postInfo.vaccination,
                description: postInfo.description,
                images: postInfo.images,
                endDate: postInfo.endDate,
              }}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                setNewPost(values);
              }}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <Form id="updatePost">
                  <Field name="title">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.title && form.touched.title}
                        mb={"4"}
                      >
                        <FormLabel>Tiêu đề</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
                    <GridItem>
                      <Field name="species">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              form.errors.species && form.touched.species
                            }
                            mb={"4"}
                          >
                            <FormLabel>Loài</FormLabel>
                            <Select
                              defaultValue={`${postInfo.species}`}
                              placeholder="Chọn loài"
                              onChange={(e) => {
                                handleSpeciesChange(e);
                                form.setValues({
                                  ...form.values,
                                  species: e.target.value,
                                });
                              }}
                            >
                              {/* <option value={''} disabled hidden selected >Xin mời chọn</option> */}
                              {speciesGenre.map((s) => (
                                <option key={s.Id} value={s.Name}>
                                  {s.Name}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.species}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem>
                      <Field name="genre">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.genre && form.touched.genre}
                            mb={"4"}
                          >
                            <FormLabel>Giống</FormLabel>
                            <Select
                              defaultValue={`${postInfo.genre}`}
                              placeholder="Chọn giống"
                              onChange={(e) => {
                                form.setValues({
                                  ...form.values,
                                  genre: e.target.value,
                                });
                              }}
                            >
                              {/* <option value={''} disabled hidden selected >Xin mời chọn</option> */}
                              {genre.map((g) => (
                                <option key={g.Id} value={g.Name}>
                                  {g.Name}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.species}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  </Grid>

                  <Field name="quantity">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.quantity && form.touched.quantity
                        }
                        mb={"4"}
                      >
                        <FormLabel>Số lượng </FormLabel>
                        <NumberInput
                          value={form.values.quantity}
                          onChange={(valueNumber) =>
                            form.setValues({
                              ...form.values,
                              quantity: valueNumber,
                            })
                          }
                          min={1}
                          step={1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>
                          {form.errors.quantity}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="gender">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.gender && form.touched.gender}
                        mb={"4"}
                      >
                        <FormLabel>Giới tính</FormLabel>
                        <RadioGroup
                          {...field}
                          //defaultValue={`${postInfo.gender}`}
                          onChange={(value) =>
                            form.setValues({ ...form.values, gender: value })
                          }
                        >
                          <Radio value="Đực">Giống đực</Radio>
                          <Radio value="Cái" pl={"30%"}>
                            Giống cái
                          </Radio>
                        </RadioGroup>
                        <FormErrorMessage>
                          {form.errors.gender}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
                    <GridItem>
                      <Field name="weight">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              form.errors.weight && form.touched.weight
                            }
                            mb={"4"}
                          >
                            <FormLabel>Cân nặng (kg)</FormLabel>
                            <NumberInput
                              // {...field}
                              //defaultValue={`${postInfo.weight}`}
                              value={form.values.weight}
                              onChange={(valueNumber) =>
                                form.setValues({
                                  ...form.values,
                                  weight: valueNumber,
                                })
                              }
                              min={0}
                              precision={2}
                              step={0.2}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <FormErrorMessage>
                              {form.errors.weight}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>

                    <GridItem>
                      <Field name="age">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.age && form.touched.age}
                            mb={"4"}
                          >
                            <FormLabel>Tuổi (tháng)</FormLabel>

                            <NumberInput
                              // {...field}
                              //defaultValue={`${postInfo.age}`}
                              value={form.values.age}
                              onChange={(valueNumber) =>
                                form.setValues({
                                  ...form.values,
                                  age: valueNumber,
                                })
                              }
                              min={0}
                              step={1}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <FormErrorMessage>
                              {form.errors.age}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  </Grid>

                  <Field name="price">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.price && form.touched.price}
                        mb={"4"}
                      >
                        <FormLabel>Giá (VNĐ)</FormLabel>
                        <NumberInput
                          // {...field}
                          //defaultValue={`${postInfo.price}`}
                          value={form.values.price}
                          onChange={(valueNumber) =>
                            form.setValues({
                              ...form.values,
                              price: valueNumber,
                            })
                          }
                          min={0}
                          step={1000}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="vaccination">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.vaccination && form.touched.vaccination
                        }
                        mb={"4"}
                      >
                        <FormLabel>Tiêm phòng</FormLabel>
                        <RadioGroup
                          //defaultValue={`${postInfo.vaccination}`}
                          {...field}
                          onChange={(value) => {
                            form.setValues({
                              ...form.values,
                              vaccination: value === "true" ? true : false,
                            });
                          }}
                        >
                          <Radio value={true}>Đã tiêm chủng</Radio>
                          <Radio value={false} pl={"30%"}>
                            Chưa tiêm chủng
                          </Radio>
                        </RadioGroup>
                        <FormErrorMessage>
                          {form.errors.vaccination}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                        mb={"4"}
                      >
                        <FormLabel>Mô tả</FormLabel>
                        <Textarea
                          {...field}
                          //defaultValue={`${postInfo.description}`}
                          placeholder="Hãy cho mọi người biết về thú cưng của bạn như: Tính cách, thói quen,..."
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <FormLabel>Địa chỉ hiển thị</FormLabel>

                  <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
                    <GridItem>
                      <Field name="province">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.province && form.touched.province
                            }
                            mb={"4"}
                          >
                            <FormLabel></FormLabel>
                            <Select
                              placeholder="Chọn tỉnh thành"
                              //defaultValue={`${postInfo.province}`}
                              onChange={(e) => {
                                handleProvinceChange(e, postInfo.province);
                                form.setValues({
                                  ...form.values,
                                  province: e.target.value,
                                });
                              }}
                            >
                              {province.map((c) => (
                                <option
                                  key={c.Id}
                                  value={c.Name}
                                  defaultValue={postInfo.province == c.Name}
                                >
                                  {c.Name}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.province}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>

                    <GridItem>
                      <Field name="district">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.district && form.touched.district
                            }
                            mb={"4"}
                          >
                            <FormLabel></FormLabel>
                            <Select
                              placeholder="Chọn quận huyện"
                              //defaultValue={`${postInfo.district}`}
                              onChange={(e) => {
                                handleDistrictChange(e);
                                form.setValues({
                                  ...form.values,
                                  district: e.target.value,
                                });
                              }}
                            >
                              {district.map((c) => (
                                <option
                                  key={c.Id}
                                  value={c.Name}
                                  // selected={postInfo.district == c.Name}
                                  defaultValue={postInfo.district == c.Name}
                                >
                                  {c.Name}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.district}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>

                    <GridItem>
                      <Field name="commune">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.commune && form.touched.commune
                            }
                            mb={"4"}
                          >
                            <FormLabel></FormLabel>
                            <Select
                              placeholder="Chọn phường xã"
                              //defaultValue={`${postInfo.commune}`}
                              onChange={(e) =>
                                form.setValues({
                                  ...form.values,
                                  commune: e.target.value,
                                })
                              }
                            >
                              {commune.map((c) => (
                                <option
                                  key={c.Id}
                                  value={c.Name}
                                  defaultValue={postInfo.commune == c.Name}
                                  // selected={postInfo.commune == c.Name}
                                >
                                  {c.Name}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.commune}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  </Grid>

                  <Field name="address">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.address && form.touched.address}
                        mb={"4"}
                      >
                        <FormLabel>Địa chỉ chi tiết</FormLabel>
                        <Input
                          {...field}
                          placeholder="Hãy ghi chi tiết về địa chỉ của bạn như : số nhà, đường, gần địa điểm lớn nào"
                        />
                        <FormErrorMessage>
                          {form.errors.address}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="endDate">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.endDate && form.touched.endDate}
                        mb={"4"}
                      >
                        <FormLabel>Thời gian kết thúc hiển thị</FormLabel>
                        <DatePicker
                          disabled
                          selected={endDatee}
                          onSelect={handleEndDateSelect}
                          onChange={(date) => {
                            handleEndDateeChange(date);
                            form.setValues({ ...form.values, endDate: date });
                          }}
                          minDate={moment().toDate()}
                          dateFormat="dd/MM/yyyy"
                        />
                        <FormHelperText>
                          Sau thời gian trên bài đăng sẽ hết hạn, để thay đổi
                          thời gian kết thúc, vui lòng liên hệ với admin
                        </FormHelperText>
                        <FormErrorMessage>
                          {form.errors.endDate}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="images">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.images && form.touched.images}
                        mb={"4"}
                      >
                        <FormLabel>Ảnh</FormLabel>
                        <FilesDropzone
                          onUploaded={(e) => {
                            form.setValues({ ...form.values, images: e });
                          }}
                          defaultFiles={files}
                        />
                        <FormErrorMessage>
                          {form.errors.images}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    // type="submit"
                    onClick={() => {
                      onOpen();
                      setNewPost(values);
                    }}
                    mt={4}
                    colorScheme="blue"
                    bg="#f5897e"
                    _hover={{ bg: "#f56051" }}
                  >
                    Cập nhật bài viết
                  </Button>

                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    closeOnOverlayClick={false}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader display={"flex"} justifyContent={"center"}>
                        Cập nhật bài viết
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text
                          fontWeight="bold"
                          mb="1rem"
                          display={"flex"}
                          justifyContent={"center"}
                        >
                          Bạn chắc chắn về những thay đổi trên?
                        </Text>
                      </ModalBody>

                      <ModalFooter display={"flex"} justifyContent={"center"}>
                        <Button
                          isLoading={updateLoading}
                          type="submit"
                          colorScheme="blue"
                          mr={3}
                          bg="#f5897e"
                          _hover={{ bg: "#f56051" }}
                          form="updatePost"
                          onClick={() => handleUpdatePost()}
                        >
                          Xác nhận
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                          Hủy bỏ
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default UpdatePost;

import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  IconButton,
  Image,
  Link,
  List,
  ListItem,
  ListIcon,
  Tooltip,
  Text,
  // Typography,
  useToast,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { AddIcon, CopyIcon, SmallCloseIcon } from "@chakra-ui/icons";
import bytesToSize from "../../utils/byteToSize";

function FilesDropzone({ className, onUploaded, defaultFiles, ...rest }) {
  // console.log("reload FilesDropzone", defaultFiles);
  const toast = useToast();
  const [files, setFiles] = useState(defaultFiles);

  const handleDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => prevFiles.concat(newFiles));
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
  };

  // khi reload lại UpdatePost thì update lại image files
  useEffect(() => {
    if (defaultFiles.length > 0) {
      setFiles(defaultFiles);
    }
  }, [defaultFiles]);

  const handleUpload = () => {
    const images = [];
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "places");
      formData.append("upload_preset", "qx52o297");
      formData.append("api_key", "129679773661522");
      formData.append("timestamp", Date.now() / 1000 || 0);

      return axios
        .post("https://api.cloudinary.com/v1_1/bachhs/image/upload", formData)
        .then((response) => {
          const { data } = response;
          images.push(data.secure_url);
        });
    });

    Promise.all(uploaders).then(() => {
      toast({
        title: "Tải ảnh lên thành công",
        status: "success",
        position: "bottom-right",
        duration: 3000,
        isClosable: true,
      });
      onUploaded(images);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
  });

  return (
    <Box className={clsx(className)} {...rest}>
      <Box p={"4"} borderWidth={"1px"} borderRadius={"lg"} {...getRootProps()}>
        <input {...getInputProps()} />
        <Box display="flex" alignItems="center" justifyContent="center">
          <AddIcon w={10} h={10} />
        </Box>
        <Box mt={4} textAlign="center">
          <Text>Select files</Text>
          <Box mt={2}>
            <Text>
              Drop files here or click{" "}
              <Link color="blue.500" href="#" textDecoration="underline">
                browse
              </Link>{" "}
              thorough your machine
            </Text>
          </Box>
        </Box>
      </Box>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List>
              {files.map((file, i) => (
                <ListItem key={i}>
                  {/* <Image boxSize={'200px'} src={}/> */}
                  <Grid
                    fontSize={{ base: "12px", sm: "md" }}
                    templateColumns={{ base: "repeat(4, 1fr)" }}
                    gap={"4"}
                  >
                    <GridItem>
                      <Image
                        boxSize={"100px"}
                        objectFit={"cover"}
                        src={file.preview}
                        alt={file.name}
                      />
                    </GridItem>
                    <GridItem>
                      <Text>{file.name}</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{bytesToSize(file.size)}</Text>
                    </GridItem>
                    <GridItem>
                      <Tooltip title="Remove">
                        <IconButton
                          edge="end"
                          // size="small"
                          onClick={() => {
                            const newFiles = [...files];
                            newFiles.splice(i, 1);
                            setFiles(newFiles);
                          }}
                        >
                          <SmallCloseIcon />
                        </IconButton>
                      </Tooltip>
                    </GridItem>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button color="primary" variant="contained" onClick={handleUpload}>
              Upload Files
            </Button>
            <Button onClick={handleRemoveAll}>Remove All</Button>
          </Box>
        </>
      )}
    </Box>
  );
}

FilesDropzone.propTypes = {
  className: PropTypes.string,
  onUploaded: PropTypes.func.isRequired,
  defaultFiles: PropTypes.array,
};

export default FilesDropzone;

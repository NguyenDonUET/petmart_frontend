import { useState } from "react";
import {
   Box,
   Flex,
   Image,
   useDisclosure,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalBody,
   ModalCloseButton,
   Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// const images = [
//    "https://images.unsplash.com/photo-1582456891925-a53965520520?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//    "https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
//    "https://images.unsplash.com/photo-1594922009922-d1665ed9ce44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
// ];

const PostImages = ({ images }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const { isOpen, onOpen, onClose } = useDisclosure();

   const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
   };

   const handleNext = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
   };
   const styleArrowBtn = {
      position: "absolute",
      transform: "translate(0, -50%)",
      justifyContent: "center",
      alignItems: "center",
      bgColor: "rgba(0, 0, 0, 0.54)",
      width: "20px",
      height: "50px",
      cursor: "pointer",
   };
   return (
      <Box position={"relative"} bgColor={"gray.200"} width={{base: '300px'}}>
         <Flex sx={styleArrowBtn} top={"50%"} left={"0%"} onClick={handlePrev}>
            <ChevronLeftIcon color="white" boxSize={8} />
         </Flex>

         <Image
            boxSize={{base:'300px', sm: "400px"}}
            src={images[currentIndex]}
            objectFit={"contain"}
            alt="img"
            onClick={onOpen}
         />

         <Flex sx={styleArrowBtn} top={"50%"} right={"0%"} onClick={handleNext}>
            <ChevronRightIcon color="white" boxSize={8} />
         </Flex>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bgColor={"rgba(0,0,0,0.9)"} />
            <ModalContent alignItems={"center"}>
               <Box>
                  <Image
                     src={images[currentIndex]}
                     objectFit={"cover"}
                     alt="img"
                  />
               </Box>
            </ModalContent>
         </Modal>
      </Box>
   );
};

export default PostImages;

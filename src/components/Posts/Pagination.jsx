import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPosts } from "../../redux/actions/postActions";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
const Pagination = ({ itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  //   const [itemOffset, setItemOffset] = useState(0);
  // tổng số trang
  const [pageCount, setPageCount] = useState(0);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { loading, error, showPostList, postsCount } = post;

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % postsCount;
    console.log("trang: ", event.selected + 1);
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [currentPage]);

  useEffect(() => {
    const numOfPages = Math.ceil(postsCount / itemsPerPage);
    setPageCount(numOfPages);
  }, [postsCount]);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      className="pagination"
    />
    // <Flex alignItems="center" justifyContent="flex-start" mt={"52px"} ml={7}>
    //    <Box mr="4">
    //       <Text fontSize="sm">
    //          Trang {currentPage} trên {totalPages}
    //       </Text>
    //    </Box>
    //    <Box mr="4">
    //       <Button
    //          size="sm"
    //          variant="solid"
    //          colorScheme="blue"
    //          disabled={isFirstPage}
    //          onClick={() => onPageChange(currentPage - 1)}
    //          leftIcon={<ChevronLeftIcon />}
    //       >
    //          Previous
    //       </Button>
    //    </Box>
    //    {pages.map((page) => (
    //       <Box key={page} mr="4">
    //          <Button
    //             size="sm"
    //             variant={page === currentPage ? "solid" : "outline"}
    //             colorScheme={page === currentPage ? "blue" : "gray"}
    //             onClick={() => onPageChange(page)}
    //          >
    //             {page}
    //          </Button>
    //       </Box>
    //    ))}
    //    <Box>
    //       <Button
    //          size="sm"
    //          variant="solid"
    //          colorScheme="blue"
    //          disabled={isLastPage}
    //          onClick={() => onPageChange(currentPage + 1)}
    //          rightIcon={<ChevronRightIcon />}
    //       >
    //          Next
    //       </Button>
    //    </Box>
    // </Flex>
  );
};

export default Pagination;

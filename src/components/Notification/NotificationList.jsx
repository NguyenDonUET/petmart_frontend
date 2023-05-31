import { List, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getNotifications,
  seenNotification,
} from "../../redux/actions/notificationActions";
import { getPostById, getPostForNotifi } from "../../redux/actions/postActions";
import NotificationItem from "./NotificationItem";
import NotificationModal from "./NotificationModal";

function NotificationList({ closeList }) {
  const [extendDate, setExtendDate] = useState("");
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifications } = useSelector((state) => state.notification);
  const { postForNotification } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  const handleClick = (postId, notiId, seen, type, extendDate) => {
    console.log(type);
    // lấy thông tin bài đăng
    dispatch(getPostForNotifi(postId));
    // nếu là yêu cầu gia hạn bài đăng
    if (type === "EXTENDPOST" || type === "EXTENDAPPROVED") {
      if (userInfo.user.role === "admin") {
        // mở popup ra hạn bài đăng(đã duyệt or chưa)
        onOpen();
        setExtendDate(extendDate);
      } else {
        dispatch(getPostById(postId));
        navigate(`/posts/${postId}`);
      }
    }
    if (type === "APPROVED" || type === "ADMIN") {
      dispatch(getPostById(postId));
      // nếu là admin
      if (userInfo.user.role === "admin") {
        navigate(`/admin/posts/${postId}`);
      } else {
        navigate(`/posts/${postId}`);
      }
      closeList();
    }
    if (!seen) {
      dispatch(seenNotification(notiId));
      dispatch(getNotifications());
    }
  };

  // add event click outside list and button noification button
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.matches(".notification *") &&
        !e.target.matches(".notifi-button") &&
        !e.target.matches(".notifi-icon")
      ) {
        closeList();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <List spacing={3} padding={"8px"}>
      {notifications && notifications.length <= 0 && (
        <Text textAlign={"center"}>Bạn chưa có thông báo nào cả.</Text>
      )}
      {notifications &&
        notifications.length > 0 &&
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            openNotification={handleClick}
          />
        ))}
      {postForNotification && (
        <NotificationModal
          singlePost={postForNotification}
          isOpen={isOpen}
          onClose={onClose}
          extendDate={extendDate}
        />
      )}
    </List>
  );
}

export default NotificationList;

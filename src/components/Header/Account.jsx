import {
  Menu,
  MenuButton,
  HStack,
  MenuItem,
  MenuList,
  Portal,
  Text,
  Link,
  useToast,
  Button,
  Avatar,
  AvatarBadge,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import user, { userLogout } from "../../redux/slices/user";
import { logout } from "../../redux/actions/userActions";
const accountAnonymousLinks = [
  { text: "Đăng nhập", path: "/login" },
  { text: "Đăng ký", path: "/register" },
];
const sellerAccountLinks = [
  { text: "Thông tin người dùng", path: "/profile" },
  { text: "Đăng bài viết", path: "/create-post" },
  { text: "Đăng xuất", path: "/" },
];

const buyerAccountLinks = [
  { text: "Thông tin người dùng", path: "/profile" },
  { text: "Đăng xuất", path: "/" },
];
const adminAccountLinks = [
  { text: "Thông tin người dùng", path: "/profile" },
  { text: "Danh sách người dùng", path: "/admin/users" },
  { text: "Danh sách bài đăng", path: "/admin/posts" },
  { text: "Đăng xuất", path: "/" },
];

const Account = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  // console.log(userInfo);
  let showOptions;
  const changeMenuOptions = () => {
    if (!userInfo) {
      showOptions = accountAnonymousLinks;
      return;
    }
    showOptions = buyerAccountLinks;
    const { user } = userInfo;
    if (user.role === "admin") {
      showOptions = adminAccountLinks;
    } else if (user.role === "seller" && user.isApproved) {
      showOptions = sellerAccountLinks;
    }
  };
  changeMenuOptions();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const handleClick = (link) => {
    if (link.text === "Đăng xuất") {
      logoutHandler();
      toast({
        description: "Đăng xuất thành công",
        status: "success",
        isClosable: true,
        position: "top",
      });
    }
    navigate(link.path);
  };

  return (
    <Menu>
      <MenuButton>
        <HStack>
          <Avatar boxSize={8}>
            {userInfo && <AvatarBadge boxSize="18px" bg="green.500" />}
          </Avatar>
          <Text display={{ base: "none", md: "block" }}>
            {userInfo ? userInfo.user.username : "Tài khoản"}
          </Text>
        </HStack>
      </MenuButton>
      <Portal>
        <MenuList>
          {userInfo && (
            <Text
              textAlign={"center"}
              bgColor={userInfo.user.isApproved ? "green.100" : "red.100"}
              py={2}
            >
              <Badge
                textAlign={"center"}
                colorScheme={userInfo.user.isApproved ? "green" : "red"}
              >
                {userInfo.user.isApproved ? "Đã" : "Chưa"} xác thực
              </Badge>
            </Text>
          )}

          {showOptions.map((link) => {
            return (
              <MenuItem key={link.text} onClick={() => handleClick(link)}>
                {link.text}
              </MenuItem>
            );
          })}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default Account;

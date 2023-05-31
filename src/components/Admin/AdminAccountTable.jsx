import { ChatIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

import TooltipIcon from "./TooltipIcon";
import UserAccount from "./UserAccount";
import AlertStatus from "./AlertStatus";
import { useDispatch, useSelector } from "react-redux";
import { approveUserAccount } from "../../redux/actions/userActions";
import { useEffect } from "react";

const AdminAccountTable = ({ tableHeader, data }) => {
  const dispatch = useDispatch();
  const styleIcon = {
    cursor: "pointer",
    _hover: {
      color: "blue",
    },
  };
  return (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            {tableHeader.map((title) => {
              return <Th key={title}>{title}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((user) => {
              return (
                <Tr key={user.id}>
                  <Td>
                    <UserAccount name={user.username} email={user.email} />
                  </Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <AlertStatus
                      status={user.isApproved}
                      messages={{
                        trueMess: "Đã xác thực",
                        falseMess: "Chưa xác thực",
                      }}
                    />
                  </Td>
                  <Td>{user.phone}</Td>
                  <Td>{user.address}</Td>

                  <Td>
                    <HStack spacing={6}>
                      <TooltipIcon text={"Xác thực"}>
                        <CheckIcon
                          boxSize={5}
                          sx={styleIcon}
                          onClick={() => dispatch(approveUserAccount(user.id))}
                        />
                      </TooltipIcon>
                      <TooltipIcon text={"Hủy xác thực"}>
                        <CloseIcon boxSize={4} sx={styleIcon} />
                      </TooltipIcon>
                      <TooltipIcon text={"Chat"}>
                        <ChatIcon boxSize={5} sx={styleIcon} />
                      </TooltipIcon>
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AdminAccountTable;

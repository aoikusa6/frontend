import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  authStateReset,
  logoutUser,
  switchTab,
} from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(authStateReset());
    navigate("/");
  };

  const buttonGroupItems = user ? (
    <>
      <Button
        as={Link}
        to="/profile"
        size={["sm", "lg"]}
        leftIcon={<FaUser />}
        colorScheme="linkedin"
        onClick={() => dispatch(switchTab())}
      >
        Profile
      </Button>
      <Button
        size={["sm", "lg"]}
        leftIcon={<FaSignOutAlt />}
        colorScheme="linkedin"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button
        as={Link}
        to="/register"
        size={["sm", "lg"]}
        leftIcon={<FaUserPlus />}
        colorScheme="linkedin"
        onClick={() => dispatch(switchTab())}
      >
        Register
      </Button>
      <Button
        as={Link}
        to="/login"
        size={["sm", "lg"]}
        leftIcon={<FaSignInAlt />}
        colorScheme="linkedin"
        onClick={() => dispatch(switchTab())}
      >
        Login
      </Button>
    </>
  );
  return (
    <>
      <Box as="header" py={4}>
        <Flex alignItems="center">
          <Text as={Link} to="/" fontSize={["lg", "xl"]}>
            Support desk
          </Text>
          <Spacer />
          <ButtonGroup>{buttonGroupItems}</ButtonGroup>
        </Flex>
      </Box>
      <Divider />
    </>
  );
};

export default Header;

import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import {
  FaSignInAlt,
  FaHouseUser,
  FaLock,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, authStateReset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast({
        title: "Something goes wrong.",
        description: message,
        status: "error",
        duration: 3000,
      });
    }
    if (isSuccess || user) {
      toast({
        title: `Account name ${user.name} logged in`,
        description: "Redirecting to your homepage",
        status: "success",
        duration: 3000,
      });
      navigate("/");
      dispatch(authStateReset());
    }
  }, [isError, isSuccess, user, message, dispatch, toast, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData));
  };
  return (
    <>
      <Stack width={["80%", "60%"]} mx="auto" py={4} spacing={4}>
        <Flex alignItems="center" justifyContent="center">
          <Icon as={FaSignInAlt} boxSize="2rem" />
          <Heading as="h4" fontSize={["lg", "xl"]} pl={4}>
            Login to get support from us:
          </Heading>
        </Flex>
        <Box as="form">
          <FormControl isRequired>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="gray.300" as={FaHouseUser} />}
                />
                <Input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="gray.300" as={FaLock} />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                <InputRightElement
                  onClick={() => setShowPassword(!showPassword)}
                  children={
                    <IconButton
                      variant="ghost"
                      isRound
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    />
                  }
                />
              </InputGroup>
              <Button
                width="100%"
                type="submit"
                colorScheme="linkedin"
                onClick={handleSubmit}
              >
                <Heading as="h4" fontSize={["lg", "xl"]}>
                  Login
                </Heading>
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </>
  );
};

export default Login;

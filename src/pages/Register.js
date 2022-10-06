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
import React, { useEffect, useState } from "react";
import {
  FaUserPlus,
  FaHouseUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, authStateReset } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState({
    pass1: false,
    pass2: false,
  });
  const { name, email, password, password2 } = formData;
  const { pass1, pass2 } = showPassword;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Something goes wrong.",
        description: message,
        status: "error",
        duration: 3000,
      });
    }
    if (user) {
      toast({
        title: `Account name ${user.name} logged in`,
        description: "Redirecting to your homepage",
        status: "success",
        duration: 3000,
      });
      navigate("/");
      dispatch(authStateReset());
    }
  }, [isError, user, message, dispatch, toast, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast({
        title: "Passwords does not match.",
        description: "Please check both passwords.",
        status: "error",
        duration: 3000,
      });
    } else {
      const userData = { name, email, password };
      dispatch(registerUser(userData));
    }
  };
  return (
    <>
      <Stack width={["80%", "60%"]} mx="auto" spacing={4} py={4}>
        <Flex alignItems="center" justifyContent="center">
          <Icon as={FaUserPlus} boxSize="2rem" />
          <Heading as="h4" fontSize={["lg", "xl"]} pl={4}>
            Register your account:
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
                  id="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter your nickname"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="gray.300" as={FaEnvelope} />}
                />
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="gray.300" as={FaLock} />}
                />
                <Input
                  type={pass1 ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <InputRightElement
                  onClick={() =>
                    setShowPassword((prevData) => ({
                      ...prevData,
                      pass1: !pass1,
                    }))
                  }
                  children={
                    <IconButton
                      variant="ghost"
                      isRound
                      icon={pass1 ? <FaEyeSlash /> : <FaEye />}
                    />
                  }
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="gray.300" as={FaLock} />}
                />
                <Input
                  type={pass2 ? "text" : "password"}
                  id="password2"
                  value={password2}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                />
                <InputRightElement
                  onClick={() =>
                    setShowPassword((prevData) => ({
                      ...prevData,
                      pass2: !pass2,
                    }))
                  }
                  children={
                    <IconButton
                      variant="ghost"
                      isRound
                      icon={pass2 ? <FaEyeSlash /> : <FaEye />}
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
                  Register
                </Heading>
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </>
  );
};

export default Register;

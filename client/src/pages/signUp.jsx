import Layout from "../components/generic/layout";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  Heading,
  Text,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";

const SignUp = (props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [requestState, setRequestState] = useState("not-requested");
  const toast = useToast();
  const signUp = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .post("http://127.0.0.1:8000/api/v1/users", { email, username, name, password, confirmPassword })
      .then((res) => {
        setRequestState("loaded");
        toast({
          title: "Your Account is created! Please login to continue",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

      })
      .catch((err) => {
        setRequestState("error");
      });
  };

  return (
    <Layout>
      <Center h={["75vh", "85vh"]}>
        <Box
          boxShadow="xl"
          textAlign="center"
          bg="white"
          borderRadius={5}
          p={4}
        >
          <Heading size="md" m={1}>
            Create Your Account
          </Heading>
          <form onSubmit={signUp}>
            <Input
              placeholder="Email"
              type="email"
              m={1}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <InputGroup m={1}>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup m={1}>
              <Input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup m={1}>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup m={1}>
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </InputGroup>

            {requestState === "error" && (
              <Text display="block" fontSize="sm" color="tomato">
                Email or Username Already Exists!
              </Text>
            )}
            <Button
              colorScheme="teal"
              size="sm"
              m={1}
              mb={4}
              disabled={requestState === "loading" ? 1 : 0}
              type="submit"
            >
              {requestState === "loading" && <Spinner mr={3} />}Sign Up
            </Button>
          </form>
        </Box>
      </Center>
    </Layout>
  );
};

export default SignUp;
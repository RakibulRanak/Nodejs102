import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";


const MyNavbar = (props) => {

  const MenuItems = (props) => (
    <Link
      as={RouterLink}
      mt={{ base: 4, md: 0 }}
      mr={6}
      display="block"
      to={props.to}
      style={{ color: '#FFF', textDecoration: 'none' }}
    >
      {props.children}
    </Link>
  );

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.8rem"
      bg="gray.800"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <MenuItems to="/" >Homepage</MenuItems>
        </Heading>
      </Flex>
    </Flex>
  );
};

export default MyNavbar;

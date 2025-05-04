import { Link } from "react-router-dom";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between" align="center">
        <Heading size="md" color="white">
          Movie Manager
        </Heading>
        <Flex gap={4}>
          <Button as={Link} to="/movies" colorScheme="teal" variant="outline">
            View Movies
          </Button>
          <Button as={Link} to="/add-movie" colorScheme="teal" variant="solid">
            Add Movie
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

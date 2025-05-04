import { Link, VStack, Heading, Box } from "@chakra-ui/react";

function Users() {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  return (
    <Box p={5}>
      <Heading mb={5}>Users Page</Heading>
      <VStack spacing={3} align="start">
        {users.map((user) => (
          <Link 
            key={user.id} 
            to={`/users/${user.id}`}
            color="blue.500"
            _hover={{ color: "blue.700" }}
          >
            {user.name}
          </Link>
        ))}
      </VStack>
    </Box>
  );
}

export default Users;

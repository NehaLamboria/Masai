import { useParams } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription, Box, Heading } from "@chakra-ui/react";

function UserDetails() {
  const { id } = useParams();
  const validUserIds = ["1", "2", "3"];

  if (!validUserIds.includes(id)) {
    return (
      <Box p={5}>
        <Alert status="error" variant="subtle">
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>User not found</AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading>User Details for ID: {id}</Heading>
    </Box>
  );
}

export default UserDetails;

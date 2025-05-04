import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner, Stack, Text, Button } from "@chakra-ui/react";
import { db } from "../firebase/firebase";
import { ref, onValue, remove } from "firebase/database";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const moviesRef = ref(db, "movies");
    const unsubscribe = onValue(moviesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMovies = Object.entries(data).map(([id, movie]) => ({
          id,
          ...movie,
        }));
        setMovies(loadedMovies);
      } else {
        setMovies([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    remove(ref(db, `movies/${id}`));
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Movies</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <Stack spacing={4}>
          {movies.length === 0 ? (
            <Text>No movies found.</Text>
          ) : (
            movies.map((movie) => (
              <Box key={movie.id} p={4} shadow="md" borderWidth="1px">
                <Heading size="md">{movie.title}</Heading>
                <Text>{movie.description}</Text>
                <Text fontSize="sm" color="gray.500">
                  Released: {movie.releaseYear}
                </Text>
                <Button
  mt={2}
  mr={2}
  colorScheme="blue"
  onClick={() => window.location.href = `/add-movie?id=${movie.id}`}
>
  Edit
</Button>
<Button mt={2} colorScheme="red" onClick={() => handleDelete(movie.id)}>
  Delete
</Button>

              </Box>
            ))
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Movies;

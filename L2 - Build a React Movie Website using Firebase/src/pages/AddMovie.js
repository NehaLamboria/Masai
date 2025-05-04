import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { db } from "../firebase/firebase";
import { ref, set, get } from "firebase/database";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [movieId, setMovieId] = useState(null);
  const toast = useToast();

  // Parse URL for ?id=...
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    if (id) {
      setMovieId(id);
      const movieRef = ref(db, `movies/${id}`);
      get(movieRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTitle(data.title);
          setDescription(data.description);
          setReleaseYear(data.releaseYear);
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !releaseYear) {
      toast({
        title: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newMovieId = movieId || Date.now().toString();
    const movieRef = ref(db, `movies/${newMovieId}`);
    await set(movieRef, { title, description, releaseYear });

    toast({
      title: movieId ? "Movie updated!" : "Movie added!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setTitle("");
    setDescription("");
    setReleaseYear("");
    window.location.href = "/movies";
  };

  return (
    <Box p={5}>
      <Heading mb={5}>{movieId ? "Edit Movie" : "Add Movie"}</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={3}>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Release Year</FormLabel>
          <Input value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          {movieId ? "Update Movie" : "Add Movie"}
        </Button>
      </form>
    </Box>
  );
};

export default AddMovie;

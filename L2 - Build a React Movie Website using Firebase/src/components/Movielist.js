import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieItem from "./MovieItem";

export default function MovieList() {
  const { movies } = useContext(MovieContext);

  return (
    <div>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

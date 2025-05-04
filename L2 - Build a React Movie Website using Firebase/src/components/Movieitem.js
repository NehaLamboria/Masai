import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { ref, remove } from "firebase/database";

export default function MovieItem({ movie }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/add-movie", { state: { movie } });
  };

  const handleDelete = () => {
    if (window.confirm("Delete this movie?")) {
      remove(ref(db, "movies/" + movie.id));
    }
  };

  return (
    <div>
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Year: {movie.year}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

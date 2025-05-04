import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export default function MovieForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingMovie = location.state?.movie;

  const [form, setForm] = useState({
    title: "",
    description: "",
    year: ""
  });

  useEffect(() => {
    if (editingMovie) setForm(editingMovie);
  }, [editingMovie]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { title, description, year } = form;
    return title && description && /^\d{4}$/.test(year);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return alert("Fill all fields correctly.");

    const movieId = editingMovie?.id || uuidv4();
    const movieRef = ref(db, "movies/" + movieId);

    (editingMovie ? update : set)(movieRef, form);
    navigate("/movies");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
      <button type="submit">{editingMovie ? "Update" : "Add"} Movie</button>
    </form>
  );
}

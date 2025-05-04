import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieRef = ref(db, "movies/");
    const unsubscribe = onValue(movieRef, (snapshot) => {
      const data = snapshot.val();
      const loaded = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setMovies(loaded);
    });

    return () => unsubscribe();
  }, []);

  return <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>;
};

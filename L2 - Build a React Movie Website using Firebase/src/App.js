import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MovieProvider } from "./context/MovieContext";
import AddMovie from "./pages/AddMovie";
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";


const theme = extendTheme();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <MovieProvider>
          <Navbar />
          <Routes>
            {/* Redirect / to /movies */}
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Users from "./Users";
import UserDetails from "./UserDetails";

const theme = extendTheme();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/users">
            <Route index element={<Users />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

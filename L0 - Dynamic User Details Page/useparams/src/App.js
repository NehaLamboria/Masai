import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import UserDetails from './UserDetails';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px', background: '#f0f0f0' }}>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
        <Link to="/users" style={{ margin: '0 10px' }}>Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Home Page</h1>
      <p>Navigate to <Link to="/users">Users</Link> to see the user list</p>
    </div>
  );
}

export default Home;

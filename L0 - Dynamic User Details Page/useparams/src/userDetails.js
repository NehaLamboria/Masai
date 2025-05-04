import { useParams } from 'react-router-dom';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

function UserDetails() {
  const { id } = useParams();
  const user = users.find(u => u.id === parseInt(id));

  return (
    <div style={{ padding: '20px' }}>
      <h1>Details of {user.name}</h1>
      <p>User ID: {user.id}</p>
    </div>
  );
}

export default UserDetails;

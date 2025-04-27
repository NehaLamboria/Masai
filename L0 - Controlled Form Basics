import React, { useState } from 'react';

const UsernameForm = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === '') {
      setError('Username is required');
    } else {
      setError('');
      alert(`Submitted Username: ${username}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UsernameForm;

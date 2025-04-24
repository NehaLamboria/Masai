import React, { useState } from 'react';

function App() {
  const [title, setTitle] = useState("Initial React Title");
  const [reactUpdateCount, setReactUpdateCount] = useState(0);

  const handleReactTitleChange = () => {
    setTitle(`React Title ${reactUpdateCount + 1}`);
    setReactUpdateCount(reactUpdateCount + 1);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleReactTitleChange}>
        Change Title (React)
      </button>
      <p>React DOM updates: {reactUpdateCount}</p>
    </div>
  );
}

export default App;

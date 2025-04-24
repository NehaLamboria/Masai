import React from 'react';

function App() {
  const topics = ["React", "JavaScript", "CSS"];

  return (
    <div>
      <h1>Tech Topics</h1>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

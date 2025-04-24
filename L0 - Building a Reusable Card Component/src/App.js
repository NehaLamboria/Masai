import React from "react";
import Card from "./Card";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      <Card title="Card 1">
        <p>This is the content for the first card.</p>
      </Card>
      <Card title="Card 2">
        <p>This is the content for the second card, which could be different.</p>
      </Card>
      <Card title="Card 3">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </Card>
    </div>
  );
}

export default App;

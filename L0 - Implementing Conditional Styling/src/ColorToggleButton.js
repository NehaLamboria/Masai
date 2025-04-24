import React, { useState } from "react";

function ColorToggleButton() {
  const [color, setColor] = useState("blue");

  const toggleColor = () => {
    setColor(prevColor => (prevColor === "blue" ? "red" : "blue"));
  };

  const buttonStyle = {
    backgroundColor: color,
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
  };

  return (
    <button style={buttonStyle} onClick={toggleColor}>
      Color: {color.charAt(0).toUpperCase() + color.slice(1)}
    </button>
  );
}

export default ColorToggleButton;

import React, { useState } from "react";
import "./styles.css";

function App() {
  const [activePage, setActivePage] = useState("Home");

  const renderContent = () => {
    switch (activePage) {
      case "Home":
        return <h2 className="home">Welcome to Home</h2>;
      case "About":
        return <h2 className="about">About Us</h2>;
      case "Contact":
        return <h2 className="contact">Contact Us</h2>;
      default:
        return <h2>Page Not Found</h2>;
    }
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <button onClick={() => setActivePage("Home")}>Home</button>
        <button onClick={() => setActivePage("About")}>About</button>
        <button onClick={() => setActivePage("Contact")}>Contact</button>
      </nav>
      <div style={styles.content}>{renderContent()}</div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#333",
    color: "#fff"
  },
  content: {
    padding: "2rem"
  }
};

export default App;

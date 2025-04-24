import React from "react";

function BlogPost({ title, content, isFeatured }) {
  return (
    <div
      style={{
        backgroundColor: isFeatured ? "lightyellow" : "white",
        padding: "15px",
        margin: "10px 0",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default BlogPost;

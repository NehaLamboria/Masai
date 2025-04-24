import React from "react";
import BlogPost from "./BlogPost";  

const blogs = [
  { title: "React Basics", content: "Learn the basics of React.", isFeatured: true },
  { title: "Advanced React", content: "Delve deeper into React.", isFeatured: false },
  { title: "React Performance Tips", content: "Optimize your React apps.", isFeatured: true },
];

function BlogPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Blog Posts</h1>
      {blogs.map((blog, index) => (
        <BlogPost
          key={index}
          title={blog.title}
          content={blog.content}
          isFeatured={blog.isFeatured}
        />
      ))}
    </div>
  );
}

export default BlogPage;

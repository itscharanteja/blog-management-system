import React from "react";
import "./NewPost.scss";
import { Navigate } from "react-router-dom";

function NewPost({ addPost }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e) => {
    const resetForm = () => {
      setTitle("");
      setContent("");
      setFile("");
    };
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("file", file[0]);

    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/newpost", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();
        setIsSubmitted(true);
        const newPost = {
          title: title,
          content: content,
          image: file,
          date: formattedDate,
          time: formattedTime,
        };
        addPost(newPost);
        resetForm();
        alert("Post created successfully");
      } else {
        alert("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal server error. Please try again later.");
    }
  };
  if (isSubmitted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="body">
      <form>
        <input
          type="title"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          type="content"
          name="content"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files)}
          required
          accept="image/*"
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPost;

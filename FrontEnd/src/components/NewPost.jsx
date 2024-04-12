import React from "react";
import "./NewPost.scss";

function NewPost({ addPost }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState("");

  const handleSubmit = async (e) => {
    // Submit the form data along with the image
    const resetForm = () => {
      setTitle("");
      setContent("");
      setFile("");
    };
    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("file", file[0]);
    console.log("Form Data:", file[0]);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/newpost", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();
        const newPost = {
          title: title,
          content: content,
          image: file[0],
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
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPost;

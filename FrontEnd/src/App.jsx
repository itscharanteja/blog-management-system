import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import NewPost from "./components/NewPost";
import Header from "./components/Header";
import PostList from "./components/PostList";
import Login from "./components/Login";
import PostBody from "./components/PostBody";
import Register from "./components/Register";

function App() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/", {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPosts();
  }, []);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  return (
    <Router>
      <header>
        <Header />
      </header>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <Routes>
            <Route path="/" index element={<PostList posts={posts} />} />
            <Route path="/newpost" element={<NewPost addPost={addPost} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:postId" element={<PostBody posts={posts} />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;

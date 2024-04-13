import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import NewPost from "./components/NewPost";
import Header from "./components/Header";
import PostList from "./components/PostList";
import Login from "./components/Login";
import PostBody from "./components/PostBody";
import Register from "./components/Register";

function App() {
  const [posts, setPosts] = React.useState([]);
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  return (
    <Router>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path="/" index element={<PostList posts={posts} />} />
        <Route path="/newpost" element={<NewPost addPost={addPost} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:postId" element={<PostBody posts={posts} />} />
      </Routes>
    </Router>
  );
}

export default App;

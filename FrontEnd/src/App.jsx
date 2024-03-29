import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import NewPost from "./components/NewPost";
import Header from "./components/Header";
import PostList from "./components/PostList";
import Login from "./components/Login";
import PostBody from "./components/PostBody";

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
        <Route path="/" element={<PostList posts={posts} />} />
        <Route path="/newpost" element={<NewPost addPost={addPost} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PostBody />} />
      </Routes>
    </Router>
  );
}

export default App;

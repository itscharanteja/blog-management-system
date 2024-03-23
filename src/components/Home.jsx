// Home.js

import React from "react";
import Header from "./Header";
import PostList from "./PostList";
import "./Home.scss";

function Home() {
  return (
    <div>
      <div className="head">
        <h1>Welcome to BMS</h1>
        <Header />
      </div>

      <PostList />
    </div>
  );
}

export default Home;

import React from "react";
import "./PostList.scss";
import { Link } from "react-router-dom";

function PostList({ posts }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="body">
      <h2 className="head">Today's Posts are ...</h2>

      {posts.length === 0 ? (
        <h3>No posts</h3>
      ) : (
        posts.map((post, index) => (
          <Link to={`/post/${post._id}`} key={index}>
            <div className="post">
              <div className="postBody">
                <h3 className="title">{post.title}</h3>
                <p className="content">{post.content}</p>
                <p className="datetime">
                  Created At: {formatDate(post.createdAt)}
                </p>
              </div>
              <div className="img">
                <img
                  src={"http://localhost:3000/" + post.image}
                  alt="image here"
                />
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default PostList;

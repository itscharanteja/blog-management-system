import React from "react";
import "./PostList.scss";
import { Link } from "react-router-dom";

function PostList({ posts }) {
  return (
    <div className="body">
      <h2 className="head">Today's Posts are ...</h2>

      {posts.length === 0 ? (
        <h3>No posts</h3>
      ) : (
        posts.map((post, index) => (
          <Link to={`/post/${post.id}`} key={index}>
            <div className="post">
              <div className="postBody">
                <h3 className="title">{post.title}</h3>
                <p className="content">{post.content}</p>
                <p className="datetime">
                  Date: {post.date}, Time: {post.time}
                </p>
              </div>
              <div className="img">
                {post.image && post.image instanceof Blob && (
                  <img src={URL.createObjectURL(post.image)} alt="Post" />
                )}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default PostList;

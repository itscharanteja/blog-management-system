import React from "react";
import "./PostList.scss";

function PostList({ posts }) {
  return (
    <div className="body">
      <h2 className="head">Today's Posts are ...</h2>

      {posts.length === 0 ? (
        <h3>No posts</h3>
      ) : (
        posts.map((post, index) => (
          <div className="post" key={index}>
            <div className="postBody">
              <h3 className="title">{post.title}</h3>
              <p className="content">{post.content}</p>
              <p className="datetime">
                Date: {post.date}, Time: {post.time}
              </p>
            </div>
            {post.image && post.image instanceof Blob && (
              <img src={URL.createObjectURL(post.image)} alt="Post" />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;

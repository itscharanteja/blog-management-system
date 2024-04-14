import React from "react";
import { useParams } from "react-router-dom";
import "./PostBody.scss";

function PostBody({ posts }) {
  const { postId } = useParams();
  const post = posts.find((post) => post._id === postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <div className="post">
        <div className="postheader">{post.title}</div>
        <div className="postbody">{post.content}</div>
        <div className="postfooter">This is the post footer</div>
      </div>
    </div>
  );
}

export default PostBody;

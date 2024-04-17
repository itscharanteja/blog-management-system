import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostBody.scss";

function PostBody({ posts }) {
  const { postId } = useParams();
  const post = posts.find((post) => post._id === postId);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  async function handleClick() {
    try {
      const response = await fetch(`http://localhost:3000/delete/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Post deleted successfully");
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post");
    }
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="main">
      <div className="post">
        <div className="postheader">
          <h2>{post.title}</h2>
        </div>
        <div className="postbody">
          <h4>{post.content}</h4>
        </div>
        <div className="postfooter">This is the post footer</div>
        {auth && (
          <div className="button">
            <button onClick={handleClick}>Delete this post</button>
          </div>
        )}
      </div>
      <img src={`http://localhost:3000/${post.image}`} alt="image " />
    </div>
  );
}

export default PostBody;

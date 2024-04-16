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
          setAuth(true); // User is authenticated
        } else {
          setAuth(false); // User is not authenticated
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
    <div>
      <div className="post">
        <div className="postheader">{post.title}</div>
        <div className="postbody">{post.content}</div>
        <div className="postfooter">This is the post footer</div>
        {auth && (
          <div className="button">
            <button onClick={handleClick}>Delete this post</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostBody;

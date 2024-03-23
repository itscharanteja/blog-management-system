import React from "react";
import "./NewPost.scss";

function NewPost() {
  const handleClearForm = () => {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
  };

  return (
    <div className="body">
      <form action="submit">
        <input type="text" placeholder="Title" name="title" id="title" />
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          placeholder="Content"
        ></textarea>
        <button type="submit"> Submit </button>
        <button type="button" onClick={handleClearForm}>
          Clear
        </button>
      </form>
    </div>
  );
}

export default NewPost;

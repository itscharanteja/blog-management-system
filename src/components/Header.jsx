import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <div>
      <div className="container">
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/newpost">New Post</Link>
        </p>
        <p>
          <Link to="/contact">Contact</Link>
        </p>
      </div>
    </div>
  );
}

export default Header;

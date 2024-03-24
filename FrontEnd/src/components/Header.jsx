import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <div>
      <div className="container">
        <h1>Welcome to BMS</h1>
        <nav>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/newpost">New Post</Link>
          </p>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </nav>
      </div>
    </div>
  );
}

export default Header;

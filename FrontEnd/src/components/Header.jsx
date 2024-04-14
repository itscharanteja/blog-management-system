import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  const [email, setEmail] = React.useState(null);

  useEffect(() => {
    const response = fetch("http://localhost:3000/profile", {
      method: "GET",
      credentials: "include",
    }).then((info) => {
      if (response) {
        setEmail(info);
      } else {
        setEmail(null);
      }
    });
  }, []);

  async function handleLogout() {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    setEmail(null);
  }
  return (
    <div>
      <div className="container">
        <h1>
          <Link to="/">Blog System</Link>
        </h1>
        <nav>
          {email ? (
            <>
              <p>
                <Link to="/newpost">New Post</Link>
              </p>

              <a onClick={handleLogout}>
                <p style={{ cursor: "pointer" }}>LogOut</p>
              </a>
            </>
          ) : (
            <>
              <p>
                <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to="/login">Login</Link>
              </p>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;

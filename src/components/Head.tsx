import React from "react";
import { Link } from "react-router-dom";
function Head() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link className="nav-link" to="/login">
        Login
      </Link>

      <Link className="nav-item" to="/signup">
        Sign up
      </Link>
    </nav>
  );
}

export default Head;

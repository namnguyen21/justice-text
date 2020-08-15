import React from "react";
import "./Nav.css";

export default function Nav() {
  return (
    <nav className="navbar">
      <h1>JusticeText</h1>
      <div className="button-group">
        <a className="nav-item" href="#">
          About
        </a>
        <a className="nav-item" href="#">
          Case Studies
        </a>
        <a className="nav-button" href="#">
          Contact Us
        </a>
      </div>
    </nav>
  );
}

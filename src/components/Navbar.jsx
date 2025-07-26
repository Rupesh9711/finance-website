import React from 'react';


function Navbar() {
  return (
    <nav>
      <div className="navbar-content">
        <span className="navbar-title">FinSight</span>
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
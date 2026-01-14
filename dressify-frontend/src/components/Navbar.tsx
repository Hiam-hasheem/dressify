import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="logo">
          <Link to="/">DRESSIFY</Link>
        </div>

        {/* CENTER NAV LINKS */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/sell">Sell</Link>
          <Link to="/Chats">Chats</Link>
        </nav>

        {/* AUTH LINKS */}
        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="register">
            Register
          </Link>
          <Link to="/profile">My Profile</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

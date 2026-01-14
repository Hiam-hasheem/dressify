import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h3>DRESSIFY</h3>
          <p>Give your dresses a second life.</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>

          <div>
            <h4>About</h4>
            <Link to="/about">About Dressify</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Dressify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;


import "./Header.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Header = ({ currentUser, logOut }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">
        Peeps
      </Link>
      {currentUser ? (
        <div className="navbar-auth">
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              Log Out
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-auth">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object,
  logOut: PropTypes.elementType.isRequired,
};

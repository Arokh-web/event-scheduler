import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";

const Header = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="header-container">
      <div name="logo" className="header-logo-container">
        <img src="/logo.png" className="img-logo"></img>
      </div>
      <div name="title" className="header-title-container">
        <h1 className="header-title">Event Management</h1>
      </div>
      <nav>
        <ul className="header-nav">
          <li className="header-nav-li">
            <Link to="/">Home</Link>
          </li>
          <li className="header-nav-li">
            <Link to="events">Events</Link>
          </li>
          <li className="header-nav-li">
            <Link to="events/new">Create Event</Link>
          </li>
          <li className="header-nav-li">
            {isAuthenticated || auth ? (
              <>
                <Link to="profile">Profile</Link>
              </>
            ) : (
              <></>
            )}
          </li>
          <li className="header-nav-li">
            {isAuthenticated || auth ? (
              <>
                <Link to="/" onClick={handleLogout}>
                  Log out
                </Link>
              </>
            ) : (
              <Link to="signpage">Log in or SignUp</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

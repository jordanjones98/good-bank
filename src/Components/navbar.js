import React, { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function NavBar() {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const userContext = useContext(UserContext);
  const user = userContext.user;

  const pageLinks = useMemo(
    () => [
      {
        name: "Home",
        url: "/",
        description: "Return Home",
        tooltip: "description",
      },
      {
        name: "Deposit",
        url: "/deposit",
        description: "Make a deposit",
        tooltip: "description",
      },
      {
        name: "Withdraw",
        url: "/withdraw",
        description: "Make a withdrawal",
        tooltip: "description",
      },
    ],
    []
  );

  useEffect(() => {
    pageLinks.forEach((page) => {
      if (page.url === location.pathname) {
        document.title = page.name;
      }
    });
  }, [location.pathname, pageLinks, user]);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            {pageLinks.map((page, key) => {
              return (
                <li
                  key={key}
                  className={`nav-item ${
                    location.pathname === page.url ? "active" : ""
                  }`}
                >
                  <NavLink
                    to={page.url}
                    className="nav-link"
                    data-description={page[page.tooltip]}
                  >
                    {page.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
                <span className="navbar-text">{user.name}</span>
                <li className="nav-item ms-auto">
                  <NavLink
                    className="nav-link"
                    data-description="Logout"
                    onClick={userContext.handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item ms-auto">
                  <NavLink
                    to="login"
                    className="nav-link"
                    data-description="Login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item ms-auto">
                  <NavLink
                    to="createaccount"
                    className="nav-link"
                    data-description="Create Account"
                  >
                    Create Account
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

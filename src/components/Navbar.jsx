import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <NavLink to="/company-news" className={({ isActive }) => isActive ? "active" : ""}>
        Company News
      </NavLink>

      {user?.role === "admin" && (
        <>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            Dashboard
          </NavLink>
          <NavLink to="/directory" className={({ isActive }) => isActive ? "active" : ""}>
            Directory
          </NavLink>
          <NavLink to="/leave-requests" className={({ isActive }) => isActive ? "active" : ""}>
            Leave Requests
          </NavLink>
        </>
      )}

      {user?.role === "employee" && (
        <>
          <NavLink to="/leave-requests" className={({ isActive }) => isActive ? "active" : ""}>
            My Leave Requests
          </NavLink>
          <NavLink to="/directory" className={({ isActive }) => isActive ? "active" : ""}>
            Employee List
          </NavLink>
        </>
      )}

      <div style={{ marginLeft: "auto" }}>
        <span style={{ marginRight: "12px" }}>Hi, {user?.email}</span>
        <button className="btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
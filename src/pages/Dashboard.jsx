import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";

const Dashboard = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { employees, leaveRequests } = useContext(EmployeeContext);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const totalRequests = leaveRequests.length;
    const pending = leaveRequests.filter(r => r.status === "Pending").length;
    const approved = leaveRequests.filter(r => r.status === "Approved").length;
    const rejected = leaveRequests.filter(r => r.status === "Rejected").length;

    return { totalEmployees, totalRequests, pending, approved, rejected };
  }, [employees, leaveRequests]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalEmployees}</h3>
          <p>Total Employees</p>
        </div>

        <div className="stat-card">
          <h3>{stats.totalRequests}</h3>
          <p>Total Leave Requests</p>
        </div>

        <div className="stat-card">
          <h3 style={{ color: "orange" }}>{stats.pending}</h3>
          <p>Pending Requests</p>
        </div>

        <div className="stat-card">
          <h3 style={{ color: "green" }}>{stats.approved}</h3>
          <p>Approved</p>
        </div>

        <div className="stat-card">
          <h3 style={{ color: "red" }}>{stats.rejected}</h3>
          <p>Rejected</p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="quick-actions">
        <button className="btn-primary" onClick={() => navigate("/directory")}>
          Manage Employees
        </button>

        <button className="btn-primary" onClick={() => navigate("/leave-requests")}>
          Manage Leave Requests
        </button>

      </div>
    </div>
  );
};

export default Dashboard;
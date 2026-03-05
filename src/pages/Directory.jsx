import React, { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import LeaveRequests from "./LeaveRequests";

const Directory = ({ user }) => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } =
    useContext(EmployeeContext);

  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "", department: "" });
  const [editingId, setEditingId] = useState(null);

  const [showLeavePanel, setShowLeavePanel] = useState(false);
  const [leaveFilterEmployeeId, setLeaveFilterEmployeeId] = useState(null);

  const filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  const startAdd = () => {
    setIsEditing(false);
    setForm({ name: "", role: "", email: "", department: "" });
    setEditingId(null);
  };

  const startEdit = (emp) => {
    setIsEditing(true);
    setForm({
      name: emp.name,
      role: emp.role,
      email: emp.email,
      department: emp.department
    });
    setEditingId(emp.id);
  };

  const handleSave = () => {
    if (!form.name || !form.email) {
      alert("Name and email required");
      return;
    }

    if (isEditing) {
      updateEmployee(editingId, form);
    } else {
      addEmployee(form);
    }

    startAdd();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to remove this employee? This will also remove their leave requests.")) {
      deleteEmployee(id);
    }
  };

  const handleViewLeaves = (employeeId = null) => {
    setLeaveFilterEmployeeId(employeeId);
    setShowLeavePanel(true);
  };

  useEffect(() => {
    if (user?.role === "employee") {
      startAdd();
    }
  }, [user]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <h2>Employee Directory</h2>

        <input
          placeholder="Search by name, role, email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: "12px", width: "100%", padding: "6px" }}
        />

        {user?.role === "admin" && (
          <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "12px" }}>
            <h3>{isEditing ? "Edit Employee" : "Add Employee"}</h3>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
            <div style={{ marginTop: "8px" }}>
              <button onClick={handleSave}>{isEditing ? "Save Changes" : "Add Employee"}</button>
              {isEditing && <button onClick={startAdd} style={{ marginLeft: "8px" }}>Cancel</button>}
            </div>
          </div>
        )}

        <table border="1" cellPadding="6" cellSpacing="0" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  {user?.role === "admin" ? (
                    <>
                      <button onClick={() => startEdit(emp)}>Edit</button>
                      <button onClick={() => handleDelete(emp.id)} style={{ marginLeft: "6px" }}>Delete</button>
                      <button onClick={() => handleViewLeaves(emp.id)} style={{ marginLeft: "6px" }}>View Leaves</button>
                    </>
                  ) : (
                    <button onClick={() => handleViewLeaves(emp.id)}>My Leave Requests</button>
                  )}
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="5">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>

        {user?.role === "admin" && (
          <div style={{ marginTop: "12px" }}>
            <button onClick={() => handleViewLeaves(null)}>View All Leave Requests</button>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div style={{ width: "420px", borderLeft: "1px solid #eee", paddingLeft: "16px" }}>
        {showLeavePanel && (
          <div>
            <button onClick={() => setShowLeavePanel(false)} style={{ marginBottom: "8px" }}>Close Leave Panel</button>
            <LeaveRequests
              user={user}
              employeeFilterId={leaveFilterEmployeeId} // only filter list
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
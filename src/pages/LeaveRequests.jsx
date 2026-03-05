import React, { useContext, useState, useMemo, useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

const LeaveRequests = ({ user, employeeFilterId = null }) => {
  const { employees, leaveRequests, addLeaveRequest, updateLeaveStatus } =
    useContext(EmployeeContext);

  const [form, setForm] = useState({
    employeeId: "",
    start: "",
    end: "",
    reason: ""
  });

  // Auto select logged employee for convenience
  useEffect(() => {
    if (user?.role === "employee") {
      const myEmp = employees.find(e => e.email === user.email);
      if (myEmp) setForm(f => ({ ...f, employeeId: myEmp.id }));
    }
  }, [user, employees]);

  // Filter requests for display
  const visibleRequests = useMemo(() => {
    if (employeeFilterId) {
      return leaveRequests.filter(r => r.employeeId === employeeFilterEmployeeId);
    }
    if (user?.role === "employee") {
      const me = employees.find(e => e.email === user.email);
      if (!me) return [];
      return leaveRequests.filter(r => r.employeeId === me.id);
    }
    return leaveRequests; // admin sees all
  }, [leaveRequests, employeeFilterId, user, employees]);

  const handleSubmit = () => {
    if (!form.employeeId) {
      alert("Select employee");
      return;
    }
    if (!form.start || !form.end) {
      alert("Select start and end dates");
      return;
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    const startDate = new Date(form.start);
    startDate.setHours(0,0,0,0);
    if (startDate < today) {
      alert("Start date cannot be in the past");
      return;
    }

    addLeaveRequest({
      employeeId: Number(form.employeeId),
      start: form.start,
      end: form.end,
      reason: form.reason || "",
    });

    setForm(f => ({ ...f, start: "", end: "", reason: "" }));
    alert("Leave request submitted");
  };

  const handleApproval = (id, status) => {
    updateLeaveStatus(id, status);
  };

  return (
    <div className="leave-container">

      {/* Submission form (Employee or Admin) */}
      <div className="leave-card">
        <h4>Submit Leave</h4>

        <div className="form-group">
          <label>Employee</label>
          <select
            value={form.employeeId}
            onChange={e => setForm({ ...form, employeeId: e.target.value })}
          >
            <option value="">-- select employee --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={form.start}
            onChange={e => setForm({ ...form, start: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={form.end}
            onChange={e => setForm({ ...form, end: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Reason</label>
          <input
            placeholder="Optional reason"
            value={form.reason}
            onChange={e => setForm({ ...form, reason: e.target.value })}
          />
        </div>

        <button className="btn-primary" onClick={handleSubmit}>
          Submit Leave
        </button>
      </div>

      {/* Leave Requests List */}
      <div className="leave-card">
        <h4>Leave Requests</h4>
        {visibleRequests.length === 0 && <p>No leave requests.</p>}

        {visibleRequests.map(r => {
          const emp = employees.find(e => e.id === r.employeeId) || { name: "Unknown", email: "" };

          return (
            <div
              key={r.id}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
                marginBottom: "10px"
              }}
            >
              <strong>{emp.name}</strong> ({emp.email}) <br />
              {r.start} → {r.end} <br />
              <em>{r.reason}</em> <br />
              <span
                style={{
                  fontWeight: "bold",
                  color: r.status === "Pending" ? "orange" :
                         r.status === "Approved" ? "green" : "red"
                }}
              >
                Status: {r.status}
              </span>

              {/* Admin approve/reject */}
              {user?.role === "admin" && r.status === "Pending" && (
                <div style={{ marginTop: "8px" }}>
                  <button className="btn-approve" onClick={() => handleApproval(r.id, "Approved")}>
                    Approve
                  </button>
                  <button className="btn-reject" onClick={() => handleApproval(r.id, "Rejected")} style={{ marginLeft: "8px" }}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveRequests;
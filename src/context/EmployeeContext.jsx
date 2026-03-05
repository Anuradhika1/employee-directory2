import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  // employees stored in localStorage
  const [employees, setEmployees] = useLocalStorage("employees", [
    // sample seed data (optional)
    { id: 1, name: "Kasun Perera", role: "Developer", email: "kasun@company.com", department: "Engineering" },
    { id: 2, name: "Nirosha Silva", role: "Designer", email: "nirosha@company.com", department: "Marketing" },
  ]);

  // leave requests stored in localStorage
  // each: { id, employeeId, start, end, reason, status }
  const [leaveRequests, setLeaveRequests] = useLocalStorage("leaveRequests", []);

  // employee CRUD helpers
  const addEmployee = (emp) => {
    const newEmp = { ...emp, id: Date.now() };
    setEmployees([...employees, newEmp]);
  };

  const updateEmployee = (id, updated) => {
    setEmployees(employees.map(e => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteEmployee = (id) => {
    // also optionally remove leave requests for that employee
    setEmployees(employees.filter(e => e.id !== id));
    setLeaveRequests(leaveRequests.filter(r => r.employeeId !== id));
  };

  // leave request helpers
  const addLeaveRequest = (request) => {
    const newReq = { ...request, id: Date.now(), status: "Pending" };
    setLeaveRequests([newReq, ...leaveRequests]);
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests(leaveRequests.map(r => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      leaveRequests,
      addLeaveRequest,
      updateLeaveStatus
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};
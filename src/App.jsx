import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Directory from "./pages/Directory";
import LeaveRequests from "./pages/LeaveRequests";
import CompanyNews from "./pages/CompanyNews";
import Navbar from "./components/Navbar";

function App() {
  // persistent user
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const handleLogout = () => setUser(null);

  return (
    <Router>
      {/* Navbar only when logged in */}
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        {/* ROOT = Login page (ඇතුළු වීමෙන් පසුව redirect වෙනවා) */}
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Protected admin routes */}
        <Route
          path="/dashboard"
          element={user?.role === "admin" ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/directory"
          element={user ? <Directory user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/leave-requests"
          element={user ? <LeaveRequests user={user} /> : <Navigate to="/" />}
        />

        {/* public */}
        <Route path="/company-news" element={<CompanyNews />} />

        {/* catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
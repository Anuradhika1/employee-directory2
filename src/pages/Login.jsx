import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { email: "admin@abc.com", password: "admin123", role: "admin" },
    { email: "employee@abc.com", password: "emp111", role: "employee" },
  ];

  const handleLogin = () => {
    const found = users.find(
      u => u.email === email && u.password === password
    );

    if (!found) {
      setError("Invalid email or password");
      return;
    }

    setUser(found);
    setError("");

    if (found.role === "admin") navigate("/dashboard");
    else navigate("/leave-requests");
  };

  return (
    <div className="center-page">
      <div className="company-title">ABC Company</div>
      <h2 style={{ color: "#444" }}>Login Page</h2>

      <div className="card">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "12px", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "12px", padding: "10px" }}
        />
        <button className="btn-primary" onClick={handleLogin}>
          Login
        </button>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
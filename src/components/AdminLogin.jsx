import React, { useState } from "react";
import { Route, Navigate } from "react-router-dom";

const ADMIN_PASSWORD = "Web3LagosAdmin2025";

function AdminLogin({ setIsAuthenticated }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuthenticated", "true");
      setIsAuthenticated(true);
      
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin
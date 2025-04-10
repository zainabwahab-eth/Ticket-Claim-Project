import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./adminLogin.module.css";
import { useAuth } from "./AuthContext";

const ADMIN_PASSWORD = "Web3LagosAdmin2025";

function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = function (e) {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginDetails.password === ADMIN_PASSWORD) {
      login();
      navigate("/adminDashboard");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className={styles.adminLogin}>
      <h2>Admin Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleLogin}>
        <label>
          Username
          <input
            name="username"
            type="text"
            value={loginDetails.username}
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={loginDetails.password}
            onChange={handleChange}
          />
        </label>
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;

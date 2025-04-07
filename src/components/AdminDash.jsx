import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { analytics } from "../../firebase";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerifiedUsers = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(analytics, "verifiedUsers"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);

        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
        });

        setUsers(userData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching verified users:", err);
        setError("Failed to load user data. Please try again.");
        setLoading(false);
      }
    };

    fetchVerifiedUsers();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Admin Dashboard</h1>
      <h2>Verified Users</h2>

      {loading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.usersTable}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Wallet Address</th>
                <th>Submission Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td className={styles.address}>{user.walletAddress}</td>
                    <td>{formatDate(user.timestamp)}</td>
                    <td className={user.verificationStatus}></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    No verified users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

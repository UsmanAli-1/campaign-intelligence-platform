import React, { useState, useEffect } from "react";

// Reusable Card Component
const Card = ({ title, value }) => {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

// User List Component
const UserList = ({ users }) => {
  return (
    <div style={styles.section}>
      <h2>Users</h2>
      {users.map((user, index) => (
        <div key={index} style={styles.userItem}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fake API Call
  useEffect(() => {
    const fakeUsers = [];
    for (let i = 1; i <= 10; i++) {
      fakeUsers.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
      });
    }
    setUsers(fakeUsers);
  }, []);

  const increment = () => setCount(count + 1);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div style={{ ...styles.container, background: darkMode ? "#222" : "#f4f4f4", color: darkMode ? "#fff" : "#000" }}>
      
      <header style={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={toggleTheme} style={styles.button}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      <div style={styles.grid}>
        <Card title="Users" value={users.length} />
        <Card title="Clicks" value={count} />
        <Card title="Revenue" value="$1200" />
        <Card title="Growth" value="15%" />
      </div>

      <div style={styles.section}>
        <h2>Actions</h2>
        <button onClick={increment} style={styles.button}>
          Increase Count
        </button>
      </div>

      <UserList users={users} />

      <footer style={styles.footer}>
        <p>© 2026 Demo Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Styles Object
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#4CAF50",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  section: {
    marginTop: "30px",
  },
  userItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    marginTop: "10px",
    border: "none",
    background: "#007BFF",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
  },
};

export default Dashboard;
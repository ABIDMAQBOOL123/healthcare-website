import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    const requestBody = { name, email, password };
    console.log("Request Body:", requestBody);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message || "An error occurred");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <p style={styles.description}>Create a new account to get started.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Register"}
          </button>
        </form>
        <button
          onClick={() => (window.location.href = "/login")}
          style={styles.toggleButton}
        >
          Already have an account? Login
        </button>
        {message && (
          <div style={styles.alert} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    textAlign: "left",
  },
  description: {
    color: "#6b7280",
    marginBottom: "1.5rem",
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "500",
    textAlign: "left",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "0.25rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.75rem",
    borderRadius: "0.25rem",
    border: "none",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
  },
  toggleButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    marginTop: "1rem",
    fontSize: "0.875rem",
    textAlign: "left",
  },
  alert: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "0.75rem",
    borderRadius: "0.25rem",
    marginTop: "1rem",
  },
};

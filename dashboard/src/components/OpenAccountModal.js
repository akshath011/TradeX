import React, { useState } from "react";

import { useAuth } from "./AuthContext";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: 4,
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  color: "#666",
  marginBottom: 4,
};

// openAccount = true  → sign in, then open the commodity account (Funds page)
// openAccount = false → just sign in (top-right corner)
const OpenAccountModal = ({ onClose, openAccount = true, title }) => {
  const { login, signup, openCommodity } = useAuth();
  const [tab, setTab] = useState("login"); // "login" or "signup"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const heading =
    title || (openAccount ? "Open commodity account" : "Login to TradeX");

  const submitLabel = () => {
    if (busy) return "Please wait...";
    if (openAccount) {
      return tab === "login" ? "Login & open account" : "Sign up & open account";
    }
    return tab === "login" ? "Login" : "Sign up";
  };

  const switchTab = (next) => {
    setTab(next);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (tab === "signup") {
      if (!/^[A-Za-z0-9_]{3,30}$/.test(username.trim())) {
        setError("Username: 3 to 30 letters, numbers or underscores");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    try {
      setBusy(true);
      if (tab === "login") {
        await login(username, password);
      } else {
        await signup(username, password);
      }
      if (openAccount) {
        await openCommodity();
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not reach the server");
      setBusy(false);
    }
  };

  const tabStyle = (active) => ({
    flex: 1,
    padding: "10px 0",
    border: "none",
    borderBottom: active ? "2px solid #387ed1" : "2px solid #eee",
    background: "transparent",
    color: active ? "#387ed1" : "#888",
    cursor: "pointer",
    fontSize: "0.9rem",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 6,
          width: 360,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 style={{ marginBottom: 14 }}>{heading}</h4>

        <div style={{ display: "flex", marginBottom: 18 }}>
          <button
            type="button"
            style={tabStyle(tab === "login")}
            onClick={() => switchTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            style={tabStyle(tab === "signup")}
            onClick={() => switchTab("signup")}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="oa-username" style={labelStyle}>
              Username
            </label>
            <input
              id="oa-username"
              type="text"
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="oa-password" style={labelStyle}>
              Password
            </label>
            <input
              id="oa-password"
              type="password"
              autoComplete={
                tab === "login" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                tab === "login" ? "Enter your password" : "At least 6 characters"
              }
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ color: "#df514c", fontSize: "0.8rem", marginBottom: 12 }}>
              {error}
            </p>
          )}

          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              className="btn btn-blue"
              style={{ border: "none", cursor: "pointer" }}
              disabled={busy}
            >
              {submitLabel()}
            </button>
            <button
              type="button"
              className="btn btn-grey"
              style={{ border: "none", cursor: "pointer" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpenAccountModal;
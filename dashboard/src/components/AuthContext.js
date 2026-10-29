import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const API = process.env.REACT_APP_API_URL || "http://localhost:3002";;

// Send the login cookie with every request to the backend
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On page load, ask the backend whether the login cookie is still valid
  useEffect(() => {
    axios
      .get(`${API}/auth/me`)
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const res = await axios.post(`${API}/auth/login`, { username, password });
    setUser(res.data.user);
  };

  const signup = async (username, password) => {
    const res = await axios.post(`${API}/auth/signup`, { username, password });
    setUser(res.data.user);
  };

  const openCommodity = async () => {
    const res = await axios.post(`${API}/auth/commodity/open`);
    setUser(res.data.user);
  };

  const logout = async () => {
    try {
      await axios.post(`${API}/auth/logout`);
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, openCommodity, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
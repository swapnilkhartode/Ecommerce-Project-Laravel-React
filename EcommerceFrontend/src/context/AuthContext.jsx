import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Run only on first load → restore user & token from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // ✅ Called after successful login
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // ✅ Called when logging out
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);

    // 👇 Redirect to home page after logout
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* Prevent UI flicker until localStorage is checked */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

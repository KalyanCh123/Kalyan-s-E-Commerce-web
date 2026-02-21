import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = users.find(
      (u) => u.email === cleanEmail
    );

    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = {
      email: cleanEmail,
      password,
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedUser", JSON.stringify(newUser));

    setUser(newUser);

    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = users.find(
      (u) =>
        u.email === cleanEmail &&
        u.password === password
    );

    if (!existingUser) {
      return { success: false, message: "Invalid credentials" };
    }

    localStorage.setItem("loggedUser", JSON.stringify(existingUser));
    setUser(existingUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

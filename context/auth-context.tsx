"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const foundUser = registeredUsers.find((u: any) => u.email === email);

    if (!foundUser || foundUser.password !== password) {
      throw new Error("Invalid email or password");
    }

    const loggedInUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const register = async (name: string, email: string, password: string) => {
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    if (registeredUsers.some((u: any) => u.email === email)) {
      throw new Error("Email already registered");
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    const loggedInUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

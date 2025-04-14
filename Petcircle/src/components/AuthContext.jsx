import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("userData");
        const storedToken = localStorage.getItem("authToken");
        console.log("initializeAuth - Stored token:", storedToken); // Debug

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          const normalizedUser = {
            ...parsedUser,
            role: parsedUser.role || "PetOwner",
          };
          setUser(normalizedUser);
          console.log("initializeAuth - Loaded user:", normalizedUser);
        } else {
          console.log("initializeAuth - No stored user or token");
          setUser(null);
        }
      } catch (error) {
        console.error("initializeAuth - Error:", error.message);
        localStorage.removeItem("userData");
        localStorage.removeItem("authToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (userData, token) => {
    try {
      console.log("login - Received token:", token); // Debug
      console.log("login - Received userData:", userData); // Debug
      const normalizedUser = {
        ...userData,
        role: userData.role || "PetOwner",
      };
      const normalizedRole = normalizedUser.role.toLowerCase();
      normalizedUser.role = normalizedRole === "petexpert" ? "PetExpert" : "PetOwner";

      localStorage.setItem("userData", JSON.stringify(normalizedUser));
      localStorage.setItem("authToken", token);
      console.log("login - Stored token:", token); // Debug
      setUser(normalizedUser);
    } catch (error) {
      console.error("login - Error:", error.message);
      throw new Error(`Login failed: ${error.message}`);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("logout - Token:", token); // Debug
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      setUser(null);
      console.log("logout - Successful");
    } catch (error) {
      console.error("logout - Error:", error.message);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const storedUser = localStorage.getItem("userData");
      const token = localStorage.getItem("authToken");
      console.log("refreshUser - Token:", token); // Debug
      if (!storedUser || !token) {
        console.log("refreshUser - No user or token");
        setUser(null);
        return;
      }
      const parsedUser = JSON.parse(storedUser);
      const normalizedUser = {
        ...parsedUser,
        role: parsedUser.role || "PetOwner",
      };
      setUser(normalizedUser);
      console.log("refreshUser - Refreshed user:", normalizedUser);
    } catch (error) {
      console.error("refreshUser - Error:", error.message);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
import { createContext, useContext, useState } from "react";

// 1. Create UserContext
const UserContext = createContext();

// 2. Create UserProvider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    console.log("Updating user:", userData);
    setUser(userData);
  };

  const clearUser = () => {
    console.log("Clearing user context");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom Hook for Context Access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, jobs, setJobs }}>
      {children}
    </AuthContext.Provider>
  );
};

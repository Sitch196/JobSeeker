import React, { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState("");
  const [jobs, setJobs] = useState([]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, image, setImage, jobs, setJobs }}
    >
      {children}
    </AuthContext.Provider>
  );
};

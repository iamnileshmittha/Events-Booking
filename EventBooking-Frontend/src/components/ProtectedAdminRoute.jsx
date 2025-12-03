import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  const loginTime = localStorage.getItem("adminLoginTime");
  
  // Check if session is still valid (24 hours)
  if (isAdminLoggedIn && loginTime) {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - parseInt(loginTime);
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    // Session expires after 24 hours
    if (hoursDiff > 24) {
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminLoginTime");
      return <Navigate to="/administrator" replace />;
    }
    
    return children;
  }
  
  return <Navigate to="/administrator" replace />;
}

export default ProtectedAdminRoute;

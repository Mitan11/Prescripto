import React, { useState, useContext } from "react";
import { Navigate } from "react-router";  
import { AppContext } from "../context/AppContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

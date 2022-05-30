import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContextProvider";

const ProtectedRoute = ({ children }) => {
  // This protected route insures that every user can be enterd in the application has to be logged in,
  // If the user is not logged in then it redirectd it to the Login Page

  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;

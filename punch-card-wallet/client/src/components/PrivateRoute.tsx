// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedUserType: "business" | "client";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedUserType }) => {
  const { userType } = useAuth();

  if (!userType) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (userType !== allowedUserType) {
    // Wrong user type
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
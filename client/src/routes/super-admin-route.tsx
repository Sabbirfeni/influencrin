import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react"; // Optional: Replace with your spinner icon

type SuperAdminRouteProps = {
  children?: React.ReactNode;
};

const SuperAdminRoute: React.FC<SuperAdminRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.role !== "super_admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default SuperAdminRoute;

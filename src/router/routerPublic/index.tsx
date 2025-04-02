import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { JSX } from "react";

export const RouterPublic = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, role } = useAuthStore();

    const isAdmin = role === "admin" ? "/dashboard-admin" : "/dashboard-user";

    return isAuthenticated ? <Navigate to={isAdmin} /> : children;
};

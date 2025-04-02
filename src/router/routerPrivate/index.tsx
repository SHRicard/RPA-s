import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { JSX } from "react";

export const RouterPrivate = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return !isAuthenticated ? <Navigate to="/" replace /> : children;
};
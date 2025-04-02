import { useEffect, useState } from "react";
import { useRefresh } from "../../store/useRefresh";

type AuthData = {
    email: string;
    role: "admin" | "user" | null;
    name: string | null;
    avatar: string | null;
    isAuthenticated: boolean;
    documents: string | null;
    dateBirth: string | null;
    genero: string | null;
    country: string | null;
    city: string | null;
    password: string | null;
    _id: string | null;
};

export const useUser = () => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const { refreshKey } = useRefresh();

    useEffect(() => {
        const storedAuthData = localStorage.getItem("authData");
        if (storedAuthData) {
            setAuthData(JSON.parse(storedAuthData));
        }
    }, [refreshKey]);

    return authData;
};

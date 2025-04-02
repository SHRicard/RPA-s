import { useState } from "react";

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
};

export const useUpdateUser = () => {
    const [authData, setAuthData] = useState<AuthData | null>(() => {
        const storedData = localStorage.getItem("authData");
        return storedData ? JSON.parse(storedData) : null;
    });

    const updateUser = (updatedFields: Partial<AuthData>) => {
        setAuthData((prevData) => {
            if (!prevData) return null;

            const newAuthData = { ...prevData, ...updatedFields };
            localStorage.setItem("authData", JSON.stringify(newAuthData));
            return newAuthData;
        });
    };

    return { authData, updateUser };
};

import { create } from "zustand";
import users from "../data/users.data.json";
import { saveAuthData, removeAuthData, getAuthData } from "../utils";

type User = {
    email: string;
    password: string;
    role: "admin" | "user";
    name: string;
    avatar: string;
    documents: string;
    dateBirth: string;
    genero: string;
    country: string;
    city: string;
    _id: string;

};

type AuthState = {
    isAuthenticated: boolean;
    role: "admin" | "user" | null;
    name: string | null;
    avatar: string | null;
    documents: string | null;
    dateBirth: string | null;
    genero: string | null;
    country: string | null;
    city: string | null;
    password: string | null;
    _id: string | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
};

const storedAuthData = getAuthData();
const initialAuthData = storedAuthData || {
    isAuthenticated: false,
    role: null,
    name: null,
    avatar: null,
    documents: null,
    dateBirth: null,
    genero: null,
    country: null,
    city: null,
    password: null,
    _id: null
};

const userList = users as User[];

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: initialAuthData.isAuthenticated,
    role: initialAuthData.role,
    name: initialAuthData.name,
    avatar: initialAuthData.avatar,
    documents: initialAuthData.documents,
    dateBirth: initialAuthData.dateBirth,
    genero: initialAuthData.genero,
    country: initialAuthData.country,
    city: initialAuthData.city,
    password: initialAuthData.password,
    _id: initialAuthData._id,
    login: (email, password) => {
        const user = userList.find((u) => u.email === email && u.password === password);
        if (user) {
            saveAuthData(
                user.email,
                user.role,
                user.name,
                user.avatar,
                user.documents,
                user.dateBirth,
                user.genero,
                user.country,
                user.city,
                user.password,
                user._id
            );
            set({
                isAuthenticated: true,
                role: user.role,
                name: user.name,
                avatar: user.avatar,
                documents: user.documents,
                dateBirth: user.dateBirth,
                genero: user.genero,
                country: user.country,
                city: user.city,
                password: user.password,
                _id: user._id
            });
            return true;
        }
        return false;
    },

    logout: () => {
        removeAuthData();
        set({
            isAuthenticated: false,
            role: null,
            name: null,
            avatar: null,
            documents: null,
            dateBirth: null,
            genero: null,
            country: null,
            city: null,
            password: null,
            _id: null
        });
    }
}));

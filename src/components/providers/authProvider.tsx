'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

type AuthContextType = {
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    // loginRequiredRedirect: () => void;
    user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
// const LOGIN_REQUIRED_URL = "/login";
const AUTH_COOKIE_KEY = "auth-token-key"; // The cookie we will check in middleware

type User = {
    email: string;
    uid: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    // const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if the auth cookie is set
        const authToken = Cookies.get(AUTH_COOKIE_KEY);
        if (authToken) {
            setIsAuthenticated(true);
            setUser(JSON.parse(authToken)); // Assuming token contains user data
        }
    }, []);


    const login = (user: User) => {
        setIsAuthenticated(true);
        Cookies.set(AUTH_COOKIE_KEY, JSON.stringify(user), { expires: 7 });
        setUser(user);
        const nextUrl = searchParams.get("next");
        router.replace(nextUrl || LOGIN_REDIRECT_URL);
    };

    const logout = () => {
        setIsAuthenticated(false);
        Cookies.remove(AUTH_COOKIE_KEY);
        router.replace(LOGOUT_REDIRECT_URL);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

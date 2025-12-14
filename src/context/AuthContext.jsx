import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    // Sync with localStorage on load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        if (storedToken) {
            setToken(storedToken);
            setRole(storedRole);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const data = await loginUser(credentials);
            // Matches AuthResponse.java: { token, role, message }
            const { token, role } = data; 

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            
            setToken(token);
            setRole(role);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (userData) => {
        return await registerUser(userData);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
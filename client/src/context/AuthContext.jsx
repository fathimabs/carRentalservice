import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import api from '../services/api';

export const AuthContext = createContext();

// Create a BroadcastChannel for multi-tab communication
const authChannel = new BroadcastChannel('auth_channel');

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback((isExternal = false) => {
        if (!isExternal) {
            authService.logout();
            authChannel.postMessage('logout'); // Notify other tabs
        }
        setUser(null);
        localStorage.removeItem('user');
    }, []);

    const checkAuth = async () => {
        try {
            // If we have a cached user, use it immediately while verifying
            const cachedUser = localStorage.getItem('user');
            if (cachedUser && cachedUser !== 'undefined' && cachedUser !== 'null') {
                setUser(JSON.parse(cachedUser));
            }

            // Verify with backend (will trigger refresh if necessary)
            const response = await api.get('/auth/profile');
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();

        // Listen for internal app events (like 401s)
        const handleLogoutEvent = () => logout(false);
        window.addEventListener('auth:logout', handleLogoutEvent);

        // Listen for messages from other tabs
        const handleChannelMessage = (event) => {
            if (event.data === 'logout') {
                logout(true); // External logout, don't broadcast back
            }
        };
        authChannel.addEventListener('message', handleChannelMessage);

        return () => {
            window.removeEventListener('auth:logout', handleLogoutEvent);
            authChannel.removeEventListener('message', handleChannelMessage);
        };
    }, [logout]);

    const login = async (userData) => {
        const data = await authService.login(userData);
        setUser(data);
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        setUser(data);
        return data;
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

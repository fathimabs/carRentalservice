import api from './api';

// Register user
const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    const data = response.data;
    
    // User data (non-sensitive) can still be cached in localStorage for UI
    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
};

// Login user
const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    const data = response.data;

    // User data (non-sensitive) can still be cached in localStorage for UI
    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
};

// Logout user
const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('user');
    }
};

const authService = {
    register,
    login,
    logout,
};

export default authService;

import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // Necessary for HttpOnly cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// No longer need request interceptor for tokens since they are in HttpOnly cookies
api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh tokens
                await axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true });
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed: session really expired or invalid
                localStorage.removeItem('user'); // Keep user info for UI, but clear on failure
                window.dispatchEvent(new Event('auth:logout'));
                return Promise.reject(refreshError);
            }
        }

        // If 401 and retry already happened, just logout
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('auth:logout'));
        }

        return Promise.reject(error);
    }
);

export default api;
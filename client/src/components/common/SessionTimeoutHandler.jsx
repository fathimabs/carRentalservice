import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useIdleTimer from '../../hooks/useIdleTimer';
import Button from './Button';

const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes before warning
const LOGOUT_TIMEOUT = 30 * 1000; // 30 seconds warning period

const SessionTimeoutHandler = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [showWarning, setShowWarning] = useState(false);
    const [countdown, setCountdown] = useState(30);

    // Initial idle timer (10 minutes)
    const handleIdle = () => {
        if (isAuthenticated) {
            setShowWarning(true);
            setCountdown(30);
        }
    };

    useIdleTimer({
        timeout: IDLE_TIMEOUT,
        onIdle: handleIdle,
        enabled: isAuthenticated && !showWarning
    });

    // Countdown for the warning popup
    useEffect(() => {
        let interval;
        if (showWarning && isAuthenticated) {
            interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        logout();
                        setShowWarning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showWarning, isAuthenticated, logout]);

    if (!showWarning) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform animate-in slide-in-from-bottom-8 duration-500 border border-red-100 dark:border-red-900/30">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Security Timeout</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your session is expiring due to inactivity. For your security (especially on shared devices), you will be logged out in <span className="font-bold text-red-600 dark:text-red-400">{countdown} seconds</span>.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button 
                            onClick={() => {
                                logout();
                                setShowWarning(false);
                            }}
                            variant="danger"
                            className="w-full py-3 text-lg bg-red-600 hover:bg-red-700 text-white border-none"
                        >
                            Log Out Now
                        </Button>
                        <p className="text-xs text-gray-400 italic">
                            Manual session extension is disabled for security.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionTimeoutHandler;

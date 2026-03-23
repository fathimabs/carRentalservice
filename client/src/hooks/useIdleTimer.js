import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to detect user inactivity
 * @param {number} timeout - Time in milliseconds before considered idle
 * @param {function} onIdle - Callback when user becomes idle
 * @param {boolean} enabled - Whether the timer is active
 */
const useIdleTimer = ({ timeout, onIdle, enabled = true }) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutId = useRef(null);

  const handleEvent = useCallback(() => {
    setIsIdle(false);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (enabled) {
      timeoutId.current = setTimeout(() => {
        setIsIdle(true);
        if (onIdle) onIdle();
      }, timeout);
    }
  }, [enabled, onIdle, timeout]);

  useEffect(() => {
    const events = [
      'mousemove',
      'mousedown',
      'resize',
      'keydown',
      'touchstart',
      'wheel',
      'scroll'
    ];

    if (enabled) {
      events.forEach(event => window.addEventListener(event, handleEvent));
      
      // Start initial timer
      timeoutId.current = setTimeout(() => {
        setIsIdle(true);
        if (onIdle) onIdle();
      }, timeout);
    }

    return () => {
      events.forEach(event => window.removeEventListener(event, handleEvent));
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [enabled, handleEvent, onIdle, timeout]);

  return isIdle;
};

export default useIdleTimer;

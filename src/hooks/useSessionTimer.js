// src/hooks/useSessionTimer.js
import { useEffect, useCallback, useRef } from "react";
import { supabase } from "../utils/supabase";
import useAuthStore from "../store/authStore";

const useSessionTimer = (inactivityTimeout = 15 * 60 * 1000) => {
  const { clearUser } = useAuthStore();
  const timeoutRef = useRef(null);
  const eventsRef = useRef([]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    clearUser();
  }, [clearUser]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, inactivityTimeout);
  }, [logout, inactivityTimeout]);

  const startTimer = useCallback(() => {
    // Clear any existing listeners
    if (eventsRef.current.length > 0) {
      eventsRef.current.forEach((event) => {
        window.removeEventListener(event.type, event.listener);
      });
      eventsRef.current = [];
    }

    // Set new listeners
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((eventName) => {
      const listener = () => resetTimer();
      window.addEventListener(eventName, listener);
      eventsRef.current.push({ type: eventName, listener });
    });

    // Initial reset
    resetTimer();

    // Return cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      eventsRef.current.forEach((event) => {
        window.removeEventListener(event.type, event.listener);
      });
      eventsRef.current = [];
    };
  }, [resetTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      eventsRef.current.forEach((event) => {
        window.removeEventListener(event.type, event.listener);
      });
    };
  }, []);

  return { startTimer };
};

export default useSessionTimer;

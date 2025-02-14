// src/hooks/AuthGuard.js
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import useAuthStore from "../store/authStore";
import useSessionTimer from "./useSessionTimer";

const AuthGuard = ({ children }) => {
  const { clearUser } = useAuthStore();
  const router = useRouter();
  const { startTimer } = useSessionTimer();
  const cleanupRef = useRef(null);

  useEffect(() => {
    let subscription;

    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session && !error) {
        // Cleanup previous timer before starting new one
        if (cleanupRef.current) cleanupRef.current();
        cleanupRef.current = startTimer();
      } else {
        clearUser();
        router.push("/login");
      }
    };

    checkSession();

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        if (cleanupRef.current) cleanupRef.current();
        clearUser();
        router.push("/login");
      }
    });

    subscription = authListener.data.subscription;

    return () => {
      // Cleanup all resources
      if (subscription) subscription.unsubscribe();
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [router, clearUser, startTimer]);

  return <>{children}</>;
};
export default AuthGuard;

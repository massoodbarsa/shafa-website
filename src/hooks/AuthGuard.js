// src/hooks/AuthGuard.js
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import useAuthStore from "../store/authStore";
import useSessionTimer from "./useSessionTimer";
import { UserRole } from "../enums/UserRole";

const AuthGuard = ({ children }) => {
  const { clearUser, user, isLoggedIn } = useAuthStore();
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
  }, [router.pathname, clearUser, startTimer]);

  useEffect(() => {
    if (router.pathname.includes("/admin") && user?.role !== UserRole.Admin) {
      router.push("/"); // Redirect to homepage if not admin
    }
  }, [router.pathname, user?.role]); // Run only when pathname or user role changes

  useEffect(() => {
    if (
      (router.pathname.includes("/login") ||
        router.pathname.includes("/register")) &&
      isLoggedIn()
    ) {
      router.push("/"); // Redirect to homepage if not admin
    }
  }, [router.pathname, isLoggedIn]); // Run only when pathname or user role changes

  return <>{children}</>;
};

export default AuthGuard;

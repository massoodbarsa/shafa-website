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

      if (error || !session) {
        clearUser();
        if (cleanupRef.current) cleanupRef.current();
        router.push("/login");
      } else {
        if (cleanupRef.current) cleanupRef.current();
        cleanupRef.current = startTimer();
      }
    };

    checkSession();

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        if (cleanupRef.current) cleanupRef.current();
        clearUser();
        router.push("/login");
      }
    });

    subscription = authListener.data.subscription;

    return () => {
      if (subscription) subscription.unsubscribe();
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [router.pathname, clearUser, startTimer]);

  useEffect(() => {
    // Only redirect if user is loaded and not an admin
    if (user === null) return; // Wait for user to be loaded
    if (router.pathname.includes("/admin") && user?.role !== UserRole.Admin) {
      router.push("/list");
    }
  }, [router.pathname, user]);

  useEffect(() => {
    if (
      (router.pathname.includes("/login") ||
        router.pathname.includes("/register")) &&
      isLoggedIn()
    ) {
      router.push("/list");
    }
  }, [router.pathname, isLoggedIn]);

  return <>{children}</>;
};

export default AuthGuard;

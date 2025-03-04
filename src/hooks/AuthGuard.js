import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import useAuthStore from "../store/authStore";
import useSessionTimer from "./useSessionTimer";
import { UserRole } from "../enums/UserRole";

const AuthGuard = ({ children }) => {
  const { clearUser, user, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const { startTimer } = useSessionTimer(); // 2 seconds inactivity timeout
  const cleanupRef = useRef(null);
  const hasMounted = useRef(false); // Track initial mount

  // Session check and timer setup
  useEffect(() => {
    let subscription;

    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.log("No session found:", error); // Debug log
        clearUser();
        if (cleanupRef.current) cleanupRef.current();
        router.push("/login");
      } else {
        if (cleanupRef.current) {
          console.log("Clearing previous timer"); // Debug log
          cleanupRef.current();
        }
        cleanupRef.current = startTimer();
        console.log("Timer started with 2-second inactivity timeout"); // Debug log
      }
    };

    // Run on mount and when user logs in/out
    if (!hasMounted.current || isLoggedIn() !== hasMounted.current) {
      checkSession();
      hasMounted.current = isLoggedIn(); // Update mount state
    }

    // Auth state listener
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session?.user?.id); // Debug log
      if (event === "SIGNED_OUT" || !session) {
        if (cleanupRef.current) {
          console.log("Clearing timer on sign-out"); // Debug log
          cleanupRef.current();
        }
        clearUser();
        router.push("/login");
      } else if (event === "SIGNED_IN") {
        // Restart timer on sign-in
        if (cleanupRef.current) {
          console.log("Clearing previous timer on sign-in"); // Debug log
          cleanupRef.current();
        }
        cleanupRef.current = startTimer();
        console.log("Timer restarted on sign-in with 2-second timeout"); // Debug log
      }
    });

    subscription = authListener.data.subscription;

    return () => {
      if (subscription) subscription.unsubscribe();
      if (cleanupRef.current) {
        console.log("Cleaning up timer on unmount"); // Debug log
        cleanupRef.current();
      }
    };
  }, [clearUser, startTimer, isLoggedIn]); // Added isLoggedIn to detect login state changes

  // Role-based redirect for admin routes
  useEffect(() => {
    if (user === null) return; // Wait for user to be loaded
    if (router.pathname.includes("/admin") && user?.role !== UserRole.Admin) {
      console.log("Redirecting non-admin from /admin to /list"); // Debug log
      router.push("/list");
    }
  }, [router.pathname, user]);

  // Redirect from login/register if already logged in
  useEffect(() => {
    if (
      (router.pathname.includes("/login") ||
        router.pathname.includes("/register")) &&
      isLoggedIn()
    ) {
      console.log(
        "Redirecting logged-in user from /login or /register to /list"
      ); // Debug log
      router.push("/list");
    }
  }, [router.pathname, isLoggedIn]);

  return <>{children}</>;
};

export default AuthGuard;

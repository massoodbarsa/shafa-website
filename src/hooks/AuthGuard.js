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

  // Initial session check on mount only
  useEffect(() => {
    let subscription;

    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.log("No session found on mount:", error); // Debug log
        clearUser();
        if (cleanupRef.current) cleanupRef.current();
        router.push("/login");
      } else {
        console.log("Session found on mount:", session.user.id); // Debug log
        if (cleanupRef.current) cleanupRef.current();
        cleanupRef.current = startTimer();
      }
    };

    checkSession();

    // Set up auth state listener
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session?.user?.id); // Debug log
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
  }, [clearUser, startTimer]); // Removed router.pathname from dependencies

  // Role-based redirect for admin routes
  useEffect(() => {
    if (user === null) return; // Wait for user to be loaded
    if (router.pathname.includes("/admin") && user?.role !== UserRole.Admin) {
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
      router.push("/list");
    }
  }, [router.pathname, isLoggedIn]);

  return <>{children}</>;
};

export default AuthGuard;

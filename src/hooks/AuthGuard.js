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
  const hasMounted = useRef(false);

  // Define public routes that don't require a session
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  // Session check and timer setup
  useEffect(() => {
    let subscription;

    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log("Current pathname:", router.pathname); // Debug current route
      console.log("Session check:", { session, error }); // Debug session state

      // If on a public route, skip session enforcement
      const isPublicRoute = publicRoutes.includes(router.pathname);
      if (isPublicRoute) {
        console.log(
          `Public route detected (${router.pathname}), skipping redirect`
        );
        return;
      }

      if (error || !session) {
        console.log("No session, redirecting to /login from:", router.pathname);
        clearUser();
        if (cleanupRef.current) cleanupRef.current();
        // router.push("/login");
      } else {
        console.log("Session found, starting timer");
        if (cleanupRef.current) {
          console.log("Clearing previous timer");
          cleanupRef.current();
        }
        cleanupRef.current = startTimer();
      }
    };

    if (!hasMounted.current || isLoggedIn() !== hasMounted.current) {
      console.log("Running checkSession on mount or login state change");
      checkSession();
      hasMounted.current = isLoggedIn();
    }

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, "Session:", session?.user?.id);

      const isPublicRoute = publicRoutes.includes(router.pathname);

      if (event === "SIGNED_OUT" || !session) {
        if (cleanupRef.current) {
          console.log("Clearing timer on sign-out");
          cleanupRef.current();
        }
        clearUser();
        if (!isPublicRoute) {
          console.log("Not a public route, redirecting to /login");
          // router.push("/login");
        } else {
          console.log(`On public route (${router.pathname}), no redirect`);
        }
      } else if (event === "SIGNED_IN") {
        console.log("User signed in, restarting timer");
        if (cleanupRef.current) {
          console.log("Clearing previous timer on sign-in");
          cleanupRef.current();
        }
        cleanupRef.current = startTimer();
      }
    });

    subscription = authListener.data.subscription;

    return () => {
      console.log("Cleaning up AuthGuard");
      if (subscription) subscription.unsubscribe();
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [clearUser, startTimer, isLoggedIn, router.pathname]); // Ensure route changes trigger re-check

  // Role-based redirect for admin routes
  useEffect(() => {
    if (user === null) return;
    if (router.pathname.includes("/admin") && user?.role !== UserRole.Admin) {
      console.log("Non-admin accessing /admin, redirecting to /list");
      router.push("/list");
    }
  }, [router.pathname, user]);

  // Redirect logged-in users from login/register
  useEffect(() => {
    if (
      (router.pathname === "/login" || router.pathname === "/register") &&
      isLoggedIn()
    ) {
      console.log(
        "Logged-in user on /login or /register, redirecting to /list"
      );
      router.push("/list");
    }
  }, [router.pathname, isLoggedIn]);

  return <>{children}</>;
};

export default AuthGuard;

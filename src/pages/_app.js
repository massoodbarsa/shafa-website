import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Layout from "../components/Layout"; // Your custom layout component

import { SnackbarProvider } from "notistack";
import { useRouter } from "next/router";
import useAuthStore from "../store/authStore";
import { UserRole } from "@/src/enums/UserRole";
import AuthGuard from "../hooks/AuthGuard";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();

  //Protect admin route
  useEffect(() => {
    if (router.pathname.includes("/admin") && user?.role !== UserRole.Admin) {
      router.push("/"); // Redirect to homepage if not admin
    }
  }, [router.pathname, user?.role]); // Run only when pathname or user role changes

  useEffect(() => {
    if (
      router.pathname.includes("/login") ||
      (router.pathname.includes("/register") && isLoggedIn)
    ) {
      router.push("/"); // Redirect to homepage if not admin
    }
  }, [router.pathname, user?.role]); // Run only when pathname or user role changes

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS */}
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
      >
        <AuthGuard>
          <Layout>
            <Component {...pageProps} /> {/* Render the current page */}
          </Layout>
        </AuthGuard>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;

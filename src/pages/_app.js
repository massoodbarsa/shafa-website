import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Layout from "../components/Layout"; // Your custom layout component

import { SnackbarProvider } from "notistack";
import { useRouter } from "next/router";
import useAuthStore from "../store/authStore";
import { UserRole } from "@/enums/UserRole";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { user } = useAuthStore();

  //Protect admin route
  useEffect(() => {
    const checkUserRole = async () => {
      if (router.pathname.includes("/admin") && user?.role !== UserRole.Admin) {
        router.push("/"); // Redirect to homepage if not admin
      }
    };

    checkUserRole();
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS */}
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
      >
        <Layout>
          <Component {...pageProps} /> {/* Render the current page */}
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;

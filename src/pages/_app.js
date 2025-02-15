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

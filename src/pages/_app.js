import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Layout from "../components/Layout"; // Your custom layout component

import { SnackbarProvider } from "notistack";

import AuthGuard from "../hooks/AuthGuard";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS */}
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
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

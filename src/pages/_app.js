import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Layout from "../components/Layout"; // Your custom layout component

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS */}
      <Layout>
        <Component {...pageProps} /> {/* Render the current page */}
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

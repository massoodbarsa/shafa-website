import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Layout from "../components/Layout"; // Your custom layout component
import { DefaultSeo } from "next-seo";

import { SnackbarProvider } from "notistack";

import AuthGuard from "../hooks/AuthGuard";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title="Find Farsi-Speaking Doctors"
        description="Find and connect with top Farsi-speaking doctors worldwide."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://IranianDoctorsHub.com",
          siteName: "Iranian Doctors Hub",
          images: [
            {
              url: "/main.jpeg",
              width: 1200,
              height: 630,
              alt: "Find Farsi-speaking doctors",
            },
          ],
        }}
        // twitter={{
        //   handle: "@yourhandle",
        //   site: "@yourhandle",
        //   cardType: "summary_large_image",
        // }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize CSS */}
        <Head>
          <link
            rel="icon"
            href="/favicon.svg"
            style={{ borderRadius: "50%" }}
          />
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
    </>
  );
}

export default MyApp;

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Layout from "../components/Layout"; // Your custom layout component
import { DefaultSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";
import { SnackbarProvider } from "notistack";
import AuthGuard from "../hooks/AuthGuard";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Iranian Doctors Hub</title>
        <link rel="canonical" href="https://iraniandoctorshub.com" />
        <link rel="icon" href="/logo.png" />
        <meta name="robots" content="index, follow" />
      </Head>
      <DefaultSeo
        title="Find Farsi-Speaking Doctors - Iranian Doctors Hub"
        description="Connect with trusted Farsi-speaking doctors worldwide. Read reviews, check credentials, and book appointments with ease."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://iraniandoctorshub.com",
          siteName: "Iranian Doctors Hub",
          images: [
            {
              url: "https://iraniandoctorshub.com/main.webp", // Ensure this image exists
              width: 1200,
              height: 630,
              alt: "Find Farsi-speaking doctors worldwide",
            },
          ],
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
        >
          <AuthGuard>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthGuard>
        </SnackbarProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default MyApp;

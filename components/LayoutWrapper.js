"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { usePathname } from "next/navigation"; // Added to detect current route URL track
import SpaIcon from "@mui/icons-material/Spa";
import Navbar from "./Navbar"; // Imports your sticky navigation bar component
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Checks if the user is currently at the root landing page path
  const isLandingPage = pathname === "/";

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        overflowY: "auto",
        backgroundColor: "background.default",

        backgroundImage: 'url("/landing-bg.jpeg")',
        backgroundSize: {
          xs: "cover",
          sm: "100% 100%",
        },
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#FFFFFF",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Conditionally renders the Navbar strictly on inner dashboard tracks, NOT on the landing page */}
      {!isLandingPage && <Navbar />}

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2.5, md: 4 },
          // Dynamically sets top padding margins depending on navbar visibility state
          pt: isLandingPage ? { xs: 4, md: 6 } : { xs: 3, md: 5 },
          pb: { xs: 4, md: 6 },
          px: 2,
          my: "auto",
          width: "100%",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        {/* ─── SHARED BRANDING HEADER GROUP ─── */}
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
              letterSpacing: "0.25em",
              color: "primary.main",
              fontSize: { xs: "3rem", md: "4.5rem" },
              fontFamily: "serif",
              mb: 0.5,
              textShadow: "0px 4px 15px rgba(186, 179, 203, 0.6)",
              animation:
                "shafaReveal 5s cubic-bezier(0.25, 1, 0.5, 1) forwards",
              animationDelay: "0.2s",
            }}
          >
            SHAFA
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "primary.main",
              fontSize: { xs: "0.9rem", md: "1.6rem" },
              fontFamily: "serif",
              textTransform: "uppercase",
              mb: 2,
              animation:
                "subtitleReveal 4s cubic-bezier(0.25, 1, 0.5, 1) forwards",
              animationDelay: "0.1s", // Staggers it cleanly right behind
            }}
          >
            HYPNOTHERAPY & WELLNESS
          </Typography>
        </Box>

        {/* ─── SHARED GOLD THIN LINE DIVIDER WITH LOTUS ─── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "450px",
            mb: 1,
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(201,151,69,0) 0%, rgba(201,151,69,0.6) 100%)",
            }}
          />
          <SpaIcon
            sx={{
              color: "secondary.main",
              mx: 2,
              fontSize: "1.6rem",
              transform: "scaleY(0.9)",
            }}
          />
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(270deg, rgba(201,151,69,0) 0%, rgba(201,151,69,0.6) 100%)",
            }}
          />
        </Box>

        {/* ─── COMPONENT CHILDREN CONTENT INJECTION SPECTRUM ─── */}
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>

        {/* ─── SHARED FIXED IMMUTABLE BOTTOM MOTTO BLOCK ─── */}
        <Box sx={{ textAlign: "center", mt: { xs: 2, md: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.05em",
              color: "primary.main",
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontFamily: "serif",
              mb: 1,
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Healing begins within
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Noto Naskh Arabic", serif',
              color: "#fff",
              fontWeight: 300,
              fontSize: { xs: "1.25rem", md: "1.45rem" },
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            شفا از درون آغاز می‌شود
          </Typography>
        </Box>
      </Container>
      {!isLandingPage && <Footer />}
    </Box>
  );
}

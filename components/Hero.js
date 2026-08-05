"use client";
import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { texts, lang } = useLanguage();

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        backgroundColor: "#120B24", // Deep signature purple fallback base
        color: "white",
        px: 2,
        overflow: "hidden",
      }}
    >
      {/* ─── FULL BACKGROUND COVER IMAGE LAYER ─── */}
      <Box
        component="img"
        src="/hypno.jpg"
        alt="Hypnotherapy Mind Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Forces the image to fill the whole block without stretching distorting
          objectPosition: "center",
          pointerEvents: "none",
          zIndex: 1,

          // ABSORPTION FILTERS:
          mixBlendMode: "screen", // Melds the image natively right into the underlying deep purple
          filter: `
            brightness(1.15) 
            contrast(1.1) 
            drop-shadow(0px 0px 40px rgba(147, 51, 234, 0.4))
          `,
          opacity: 0.45, // Softens the image density slightly so it remains readable behind text
        }}
      />

      {/* ─── CENTER NEBULA GLOW OVERLAY ─── */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          // Generates a massive shimmering purple & gold light emission center point
          background:
            "radial-gradient(circle, rgba(147,51,234,0.4) 0%, rgba(197,168,128,0.15) 40%, rgba(18,11,36,0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 2,
          animation: "ambientPulse 6s infinite ease-in-out",
          "@keyframes ambientPulse": {
            "0%, 100%": {
              transform: "translate(-50%, -50%) scale(1)",
              opacity: 0.7,
            },
            "50%": {
              transform: "translate(-50%, -50%) scale(1.15)",
              opacity: 1,
            },
          },
        }}
      />

      {/* ─── BOTTOM SMOOTH GRADIENT TRANSITION SHADOW ─── */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "180px",
          // Blocks out sharp borders at the base to cascade smoothly into your next home component
          background:
            "linear-gradient(180deg, rgba(18,11,36,0) 0%, #120B24 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* ─── CENTRAL TYPOGRAPHY INTERFACE ─── */}
      <Container
        maxWidth="md"
        sx={{ position: "relative", zIndex: 4, mx: "auto" }}
      >
        {/* Main Title Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 300,
            letterSpacing: lang === "fa" ? 0 : 6,
            mb: 1,
            color: "#C5A880",
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontFamily: "serif",
            direction: lang === "fa" ? "rtl" : "ltr",
            textShadow: "0px 4px 12px rgba(0,0,0,0.5)", // Keeps title visible over a noisy visual backing track
          }}
        >
          {texts.title}
        </Typography>

        {/* Subtitle Branding Text */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            letterSpacing: lang === "fa" ? 0 : 4,
            mb: 4,
            color: "#00f6ff",
            fontSize: { xs: "0.85rem", md: "1.05rem" },
            direction: lang === "fa" ? "rtl" : "ltr",
          }}
        >
          {texts.subtitle}
        </Typography>

        {/* Body Tagline */}
        <Typography
          variant="h5"
          sx={{
            mb: 6,
            fontWeight: 300,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.9)",
            fontSize: { xs: "1.1rem", md: "1.5rem" },
            direction: lang === "fa" ? "rtl" : "ltr",
            mx: "auto",
            maxWidth: "700px",
            textShadow: "0px 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {texts.tagline}
        </Typography>

        {/* Double Primary Action Buttons Container */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            direction: "ltr",
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#C5A880",
              color: "#120B24",
              borderRadius: 0,
              fontWeight: 600,
              px: 5,
              py: 1.6,
              width: { xs: "100%", sm: "auto" },
              "&:hover": { bgcolor: "#B3966E" },
            }}
          >
            {texts.bookSession}
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
              borderRadius: 0,
              fontWeight: 400,
              px: 5,
              py: 1.6,
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                borderColor: "#C5A880",
                bgcolor: "rgba(197, 168, 128, 0.05)",
              },
            }}
          >
            {texts.exploreServices}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

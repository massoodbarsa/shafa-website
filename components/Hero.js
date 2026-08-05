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
        background:
          "radial-gradient(circle at center, #1D1337 0%, #120B24 100%)", // Rich purple gradient aura
        color: "white",
        px: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Main Title Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 300,
            letterSpacing: lang === "fa" ? 0 : 6, // Clears spacing logic for Persian fonts
            mb: 1,
            color: "#C5A880", // Centered Signature Gold
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontFamily: "serif",
            direction: lang === "fa" ? "rtl" : "ltr",
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
            color: "#7C6A9F",
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
            // Keeps button layout direction centered in both modes
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

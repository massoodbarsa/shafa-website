"use client";
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function Welcome() {
  const { texts, lang } = useLanguage();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "#1D1337", // Dark theme purple background container block
        borderBottom: "1px solid rgba(197, 168, 128, 0.1)",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Core Section Title Heading */}
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: "#C5A880", // Signature gold color accent
            fontWeight: 400,
            mb: 4,
            fontFamily: "serif",
            letterSpacing: lang === "fa" ? 0 : "0.05em",
            fontSize: { xs: "2rem", md: "2.8rem" },
            direction: lang === "fa" ? "rtl" : "ltr",
          }}
        >
          {texts.welcomeTitle}
        </Typography>

        {/* Centered Descriptive Biography Paragraph Block */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.15rem" },
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: 720,
            mx: "auto",
            mb: 6,
            lineHeight: 1.9,
            fontWeight: 300,
            direction: lang === "fa" ? "rtl" : "ltr",
            textAlign: "center", // Double confirms paragraph center normalization
          }}
        >
          {texts.welcomeText}
        </Typography>

        {/* Centered Call to Action Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#C5A880",
            color: "#120B24",
            borderRadius: 0, // Sharp aesthetic corners matching navbar buttons
            fontWeight: 600,
            px: 5,
            py: 1.5,
            "&:hover": { bgcolor: "#B3966E" },
          }}
        >
          {texts.learnMore}
        </Button>
      </Container>
    </Box>
  );
}
